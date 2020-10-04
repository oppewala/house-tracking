package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"github.com/oppewala/house-tracking/internal/properties-repo"
)

var propRepo propertiesrepo.PropertyRepository

func main() {
	log.Print("Starting 'management' on :8080")

	propRepo = propertiesrepo.Repo
	defer propRepo.Close()

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/house", getAllHouses).Methods("GET")
	router.HandleFunc("/house/{id}", getHouse).Methods("GET")
	router.HandleFunc("/house/{id}", deleteHouse).Methods("DELETE")
	router.HandleFunc("/house/search", searchHouse).Methods("GET")
	router.HandleFunc("/house", newHouse).Methods("POST")

	router.HandleFunc("/nbn", nbnSearch).Methods("GET")
	router.HandleFunc("/nbn/{id}", nbnLookup).Methods("GET")

	handler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://house.crackedjar.com", "http://localhost:3000"},
	}).Handler(router)
	log.Fatal(http.ListenAndServe(":8080", handler))
}
