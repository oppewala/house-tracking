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

func main() {
	http.HandleFunc("/", index)
	http.HandleFunc("/submit", submit)

	log.Printf("Starting on :5001")
	log.Fatal(http.ListenAndServe(":5001", nil))
}

func index(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	w.Write([]byte(`{"message":"Welcome to the scraper"}`))
}

func submit(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	var msg HouseRequest
	err = json.Unmarshal(b, &msg)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	url, err := url.Parse(msg.URL)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	switch url.Hostname() {
	case "domain.com.au":
	case "realestate.com.au":
		w.WriteHeader(http.StatusOK)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	w.Write([]byte(`{"message":"Submission received"}`))
}
