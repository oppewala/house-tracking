package main

import (
	"log"
	"net/http"

	"github.com/oppewala/ht-gateway/api"
)

func main() {
	http.HandleFunc("/", api.Index)
	http.HandleFunc("/submit", api.Submit)

	log.Printf("Starting on :5000")
	log.Fatal(http.ListenAndServe(":5000", nil))
}
