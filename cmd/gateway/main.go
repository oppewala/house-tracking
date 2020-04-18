package main

import (
	"log"
	"net/http"

	"github.com/oppewala/house-tracking/cmd/gateway/api"
)

func main() {
	http.HandleFunc("/", api.Index)
	http.HandleFunc("/submit", api.Submit)

	log.Printf("Starting 'Gateway' on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
