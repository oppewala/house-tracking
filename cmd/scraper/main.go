package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

// HouseRequest input for apis
type HouseRequest struct {
	URL string `json:"url"`
}

// Response message for success or handled failures
type Response struct {
	Message string `json:"message"`
}

func main() {
	http.HandleFunc("/", index)
	http.HandleFunc("/submit", submit)

	log.Printf("Starting 'Scraper' on :5001")
	log.Fatal(http.ListenAndServe(":5001", nil))
}

func index(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	w.Write([]byte(`{"message":"Welcome to the scraper"}`))
}

func submit(w http.ResponseWriter, r *http.Request) {
	log.Printf("Processing submission from API")

	if r.Method != "POST" {
		log.Fatalf("Not a post request")
		w.WriteHeader(http.StatusNotFound)
		return
	}

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		log.Fatalf("Failed to read body bytes")
		http.Error(w, err.Error(), 500)
		return
	}

	var msg HouseRequest
	err = json.Unmarshal(b, &msg)
	if err != nil {
		log.Fatalf("Failed to unmarshal json")
		http.Error(w, err.Error(), 500)
		return
	}

	url, err := url.Parse(msg.URL)
	if err != nil {
		log.Fatalf("Failed to parse url")
		http.Error(w, err.Error(), 500)
		return
	}

	var responseMessage Response
	switch url.Hostname() {
	case "www.domain.com.au", "www.realestate.com.au":
		responseMessage.Message = "Matched hostname to supported domain: " + url.Hostname()
		log.Printf(responseMessage.Message)
	default:
		responseMessage.Message = "Failed to match hostname: " + url.Hostname()
		log.Printf(responseMessage.Message)
	}

	b, err = json.Marshal(responseMessage)
	if err != nil {
		log.Fatalf("Failed to marshal response")
		http.Error(w, err.Error(), 500)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	w.Write(b)
}
