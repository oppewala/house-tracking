package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"

	eh "github.com/oppewala/house-tracking/internal/errhandler"
	"github.com/oppewala/house-tracking/pkg/nbn"
)

func nbnSearch(w http.ResponseWriter, r *http.Request) {
	qs := r.URL.Query()
	a := nbn.Address{
		Street:   qs.Get("Street"),
		Suburb:   qs.Get("Suburb"),
		Postcode: qs.Get("Postcode"),
		State:    qs.Get("State"),
	}

	sugg, err := nbn.Search(a)
	if err != nil {
		eh.Print(err, "Failed to search nbn")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	s, err := json.Marshal(sugg)
	if err != nil {
		eh.Print(err, "Failed to marshall json")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	_, err = w.Write(s)
}

func nbnLookup(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	a, err := nbn.Lookup(id)
	if err != nil {
		eh.Print(err, "Failed to search nbn")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	j, err := json.Marshal(a)
	if err != nil {
		eh.Print(err, "Failed to marshall json")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	_, err = w.Write(j)
}
