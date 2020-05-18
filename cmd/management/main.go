package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
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
	"go.mongodb.org/mongo-driver/x/mongo/driver/uuid"
)

var database *mongo.Database
var ctx context.Context

func allContents(w http.ResponseWriter, r *http.Request) {
	var propertiesCollection = database.Collection("properties")
	// var inspectionsCollection = database.Collection("inspections")

	cursor, err := propertiesCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	var properties []bson.M
	if err = cursor.All(ctx, &properties); err != nil {
		log.Fatal(err)
	}

	fmt.Println(properties)

	s, err := json.Marshal(properties)
	if err != nil {
		log.Fatalf("Failed to marshal response")
		http.Error(w, err.Error(), 500)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	_, err = w.Write(s)
	if err != nil {
		log.Fatalf("Failed to write response body")
		http.Error(w, err.Error(), 500)
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

	}

	if err != nil {
		log.Printf("%s: %s", "No matching house found", err)
		property.ID = primitive.NewObjectID()
		id, err := uuid.New()
		eh.Fatal(err, "Failed to generate unique id")
		property.PublicID = id

		_, err = propertiesCollection.InsertOne(ctx, property)
		eh.Print(err, "Failed to insert property")
		writeBadRequestResponse(w, err)

		fmt.Fprintf(w, "{ 'status': 'added', 'id': '%v', 'internalid': %v }", property.PublicID, property.ID)
	}
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
	router.HandleFunc("/house", newHouse).Methods("POST")
	router.HandleFunc("/house/{id}/inspection", newInspection).Methods("POST")

	log.Fatal(http.ListenAndServe(":8080", router))
}

func writeBadRequestResponse(w http.ResponseWriter, err error) {
	w.WriteHeader(http.StatusBadRequest)
	w.Header().Set("content-type", "application/json")
}

func getRequestedHouse(w http.ResponseWriter, r *http.Request) (shared.Property, error) {
	reqBody, err := ioutil.ReadAll(r.Body)
	eh.Print(err, "Failed to read body of request")
	if err != nil {
		writeBadRequestResponse(w, err)
		return shared.Property{}, err
	}

	var property shared.Property
	err = json.Unmarshal(reqBody, &property)
	eh.Print(err, "Failed to unmarshal request")
	if err != nil {
		writeBadRequestResponse(w, err)
		return shared.Property{}, err
	}

	// property := shared.Property{
	// 	Price: "750000-820000",
	//  PublicId:
	// 	Address: shared.Address{
	// 		Street:   "37 Camera Walk",
	// 		Suburb:   "Coburg North",
	// 		Postcode: "3058",
	// 	},
	// 	Bedrooms:  4,
	// 	Bathrooms: 2,
	// 	Parking:   2,
	// 	References: []shared.Reference{
	// 		shared.Reference{
	// 			Source: "Domain",
	// 			URL:    "https://www.domain.com.au/37-camera-walk-coburg-north-vic-3058-2016127139",
	// 		},
	// 	},
	// 	Tags: []string{"omg", "nice"},
	// }

	if property.Address.Postcode == "" ||
		property.Address.State == "" ||
		property.Address.Street == "" {
		err = errors.New("Invalid Address")
		eh.Print(err, "Invalid Address")
		if err != nil {
			writeBadRequestResponse(w, err)
			return shared.Property{}, err
		}
	}

	return property, nil

}
