package main

import (
	"log"
	"net/http"

	"github.com/oppewala/house-tracking/cmd/gateway/api"
)

func main() {
	http.HandleFunc("/", api.Index)
	http.HandleFunc("/submit", api.Submit)

	log.Printf("Starting 'Gateway' on :5000")
	log.Fatal(http.ListenAndServe(":5000", nil))
}
