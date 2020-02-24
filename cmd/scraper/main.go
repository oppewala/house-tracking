package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", api.Index)
	http.HandleFunc("/submit", api.Submit)

	log.Printf("Starting on :5001")
	log.Fatal(http.ListenAndServe(":5001", nil))
}
