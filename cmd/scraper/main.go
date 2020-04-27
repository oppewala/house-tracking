package main

import (
	"log"
	"net/http"
)

// Response message for success or handled failures
type Response struct {
	Message string `json:"message"`
}

func main() {

	http.HandleFunc("/submit", submit)
	queueHandler()

	log.Printf("Starting 'Scraper' on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
