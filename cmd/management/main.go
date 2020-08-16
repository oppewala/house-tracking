package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/oppewala/house-tracking/internal/properties-repo"
)

var propRepo properties_repo.PropertyRepository

func main() {
	log.Print("Starting 'management' on :8080")

	propRepo = properties_repo.Repo
	defer propRepo.Close()

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/house", getAllHouses).Methods("GET")
	router.HandleFunc("/house/{id}", getHouse).Methods("GET")
	router.HandleFunc("/house", newHouse).Methods("POST")

	router.HandleFunc("/nbn", nbnSearch).Methods("GET")
	router.HandleFunc("/nbn/{id}", nbnLookup).Methods("GET")

	log.Fatal(http.ListenAndServe(":8080", router))
}
