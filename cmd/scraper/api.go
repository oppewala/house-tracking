package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/oppewala/house-tracking/cmd/scraper/shared"
)

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

	msg := &shared.HouseRequest{}
	err = json.Unmarshal(b, msg)
	if err != nil {
		log.Fatalf("Failed to unmarshal json")
		http.Error(w, err.Error(), 500)
		return
	}

	res, err := houseRequestMediator(msg)
	if err != nil {
		log.Fatalf("Failed to handle url")
		http.Error(w, err.Error(), 500)
		return
	}

	var responseMessage Response
	responseMessage.Message = res

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
