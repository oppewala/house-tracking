package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson/primitive"

	eh "github.com/oppewala/house-tracking/internal/errhandler"
	"github.com/oppewala/house-tracking/internal/htdbtypes"
)

func getAllHouses(w http.ResponseWriter, _ *http.Request) {
	properties, err := propRepo.All()
	if err != nil {
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
	property, err := readPropertyFromBody(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if property.Address.Postcode == "" ||
		property.Address.State == "" ||
		property.Address.Street == "" {
		err = errors.New("invalid address")
		eh.Print(err, "Invalid Address")
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	id, err := propRepo.Add(property)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	fmt.Fprintf(w, "{ 'status': 'added', 'id': '%v' }", id)
}

func readPropertyFromBody(r *http.Request) (htdbtypes.Property, error) {
	reqBody, err := ioutil.ReadAll(r.Body)
	eh.Print(err, "Failed to read body of request")
	if err != nil {
		return htdbtypes.Property{}, err
	}

	var property htdbtypes.Property
	err = json.Unmarshal(reqBody, &property)
	eh.Print(err, "Failed to unmarshal request")
	if err != nil {
		return htdbtypes.Property{}, err
	}

	return property, nil
}

func getHouse(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	objId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		eh.Print(err, "failed to convert hex to object id")
		err = errors.New("invalid property id")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	prop, err := propRepo.Get(objId)
	if err != nil {
		eh.Print(err, "failed to get house")
		http.NotFound(w, r)
		return
	}

	s, err := json.Marshal(prop)
	if err != nil {
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
