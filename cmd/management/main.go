package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/oppewala/house-tracking/internal/scraping/nbn"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/oppewala/house-tracking/cmd/management/shared"
	htconfig "github.com/oppewala/house-tracking/internal/config"
	htdb "github.com/oppewala/house-tracking/internal/db"
	eh "github.com/oppewala/house-tracking/internal/errhandler"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var database *mongo.Database
var ctx context.Context

func main() {
	log.Print("Starting 'management' on :8080")

	config, err := htconfig.Retrieve()
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Config: %v", config)
	disconnect, db := htdb.Connect(config)
	database = db
	defer disconnect()

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", allContents).Methods("GET")
	router.HandleFunc("/nbn", nbnSearch).Methods("GET")
	router.HandleFunc("/nbn/{id}", nbnLookup).Methods("GET")
	router.HandleFunc("/house", newHouse).Methods("POST")
	router.HandleFunc("/house/{id}/inspection", newInspection).Methods("POST")

	log.Fatal(http.ListenAndServe(":8080", router))
}

func allContents(w http.ResponseWriter, _ *http.Request) {
	var propertiesCollection = database.Collection("properties")
	// var inspectionsCollection = database.Collection("inspections")

	cursor, err := propertiesCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	var properties []shared.Property
	if err = cursor.All(ctx, &properties); err != nil {
		log.Fatal(err)
	}

	fmt.Println(properties)

	s, err := json.Marshal(properties)
	if err != nil {
		err = fmt.Errorf("failed to marshal response: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	_, err = w.Write(s)
	if err != nil {
		err = fmt.Errorf("failed to write response body: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func newHouse(w http.ResponseWriter, r *http.Request) {
	var propertiesCollection = database.Collection("properties")

	property, err := getRequestedHouse(w, r)
	if err != nil {
		return
	}

	var existingProperty shared.Property
	err = propertiesCollection.FindOne(ctx, bson.M{
		"address.street":   property.Address.Street,
		"address.suburb":   property.Address.Suburb,
		"address.postcode": property.Address.Postcode}).Decode(&existingProperty)

	if err == nil {
		msg := fmt.Sprintf("Add property failed: Property already exists with matching address (%v, %v, %v)", property.Address.Street, property.Address.Suburb, property.Address.Postcode)
		log.Printf(msg)

		w.WriteHeader(http.StatusBadRequest)
		w.Header().Set("content-type", "application/json")

		res := fmt.Sprintf(`{ 'status': 'failed', 'message' "%s"}`, msg)
		_, innerErr := w.Write([]byte(res))
		eh.Fatal(innerErr, "Failed to write response on duplicate address")
		return
	}

	log.Printf("%s: %s", "No matching house found", err)
	property.ID = primitive.NewObjectID()

	_, err = propertiesCollection.InsertOne(ctx, property)
	if err != nil {
		eh.Print(err, "Failed to insert property")
		writeBadRequestResponse(w)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	fmt.Fprintf(w, "{ 'status': 'added', 'id': '%v' }", property.ID)
}

func newInspection(w http.ResponseWriter, r *http.Request) {
	var inspectionsCollection = database.Collection("inspections")

	houseID := mux.Vars(r)["id"]

	inspectionsResult, err := inspectionsCollection.InsertMany(ctx, []interface{}{
		bson.D{
			primitive.E{Key: "house", Value: houseID},
			primitive.E{Key: "date", Value: "2020-03-28"}}})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Fprintf(w, "{ 'id': '%v' }", inspectionsResult.InsertedIDs)
}

func nbnSearch(w http.ResponseWriter, r *http.Request) {
	qs := r.URL.Query()
	a := shared.Address{
		Street:   qs.Get("Street"),
		Suburb:   qs.Get("Suburb"),
		Postcode: qs.Get("Postcode"),
		State:    qs.Get("State"),
	}

	sugs, err := nbn.Search(a)
	if err != nil {
		eh.Print(err, "Failed to search nbn")
		writeBadRequestResponse(w)
		return
	}

	s, err := json.Marshal(sugs)
	if err != nil {
		eh.Print(err, "Failed to marshall json")
		writeBadRequestResponse(w)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	_, err = w.Write(s)
}

func nbnLookup(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	a, err := nbn.Lookup(id)
	if err != nil {
		eh.Print(err, "Failed to search nbn")
		writeBadRequestResponse(w)
		return
	}

	j, err := json.Marshal(a)
	if err != nil {
		eh.Print(err, "Failed to marshall json")
		writeBadRequestResponse(w)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	_, err = w.Write(j)
}

func writeBadRequestResponse(w http.ResponseWriter) {
	w.WriteHeader(http.StatusBadRequest)
	w.Header().Set("content-type", "application/json")
}

func getRequestedHouse(w http.ResponseWriter, r *http.Request) (shared.Property, error) {
	reqBody, err := ioutil.ReadAll(r.Body)
	eh.Print(err, "Failed to read body of request")
	if err != nil {
		writeBadRequestResponse(w)
		return shared.Property{}, err
	}

	var property shared.Property
	err = json.Unmarshal(reqBody, &property)
	eh.Print(err, "Failed to unmarshal request")
	if err != nil {
		writeBadRequestResponse(w)
		return shared.Property{}, err
	}

	if property.Address.Postcode == "" ||
		property.Address.State == "" ||
		property.Address.Street == "" {
		err = errors.New("Invalid Address")
		eh.Print(err, "Invalid Address")
		if err != nil {
			writeBadRequestResponse(w)
			return shared.Property{}, err
		}
	}

	return property, nil

}
