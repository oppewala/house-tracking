package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/oppewala/house-tracking/internal/properties-repo"
	"github.com/oppewala/house-tracking/pkg/nbn"

	"github.com/gorilla/mux"

	eh "github.com/oppewala/house-tracking/internal/errhandler"
	"github.com/oppewala/house-tracking/internal/htdbtypes"
)

var propRepo properties_repo.PropertyRepository

func main() {
	log.Print("Starting 'management' on :8080")

	propRepo = properties_repo.Repo
	defer propRepo.Close()

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", allContents).Methods("GET")
	router.HandleFunc("/nbn", nbnSearch).Methods("GET")
	router.HandleFunc("/nbn/{id}", nbnLookup).Methods("GET")
	router.HandleFunc("/house", newHouse).Methods("POST")

	log.Fatal(http.ListenAndServe(":8080", router))
}

func allContents(w http.ResponseWriter, _ *http.Request) {
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
	property, err := getRequestedHouse(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
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

func nbnSearch(w http.ResponseWriter, r *http.Request) {
	qs := r.URL.Query()
	a := nbn.Address{
		Street:   qs.Get("Street"),
		Suburb:   qs.Get("Suburb"),
		Postcode: qs.Get("Postcode"),
		State:    qs.Get("State"),
	}

	sugg, err := nbn.Search(a)
	if err != nil {
		eh.Print(err, "Failed to search nbn")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	s, err := json.Marshal(sugg)
	if err != nil {
		eh.Print(err, "Failed to marshall json")
		http.Error(w, err.Error(), http.StatusInternalServerError)
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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	j, err := json.Marshal(a)
	if err != nil {
		eh.Print(err, "Failed to marshall json")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	_, err = w.Write(j)
}

func getRequestedHouse(w http.ResponseWriter, r *http.Request) (htdbtypes.Property, error) {
	reqBody, err := ioutil.ReadAll(r.Body)
	eh.Print(err, "Failed to read body of request")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return htdbtypes.Property{}, err
	}

	var property htdbtypes.Property
	err = json.Unmarshal(reqBody, &property)
	eh.Print(err, "Failed to unmarshal request")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return htdbtypes.Property{}, err
	}

	if property.Address.Postcode == "" ||
		property.Address.State == "" ||
		property.Address.Street == "" {
		err = errors.New("invalid address")
		eh.Print(err, "Invalid Address")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return htdbtypes.Property{}, err
		}
	}

	return property, nil

}
