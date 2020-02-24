package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/oppewala/house-tracking/cmd/gateway/queue"
)

type houseSubmission struct {
	URL string
}

// Index blank page to test health
func Index(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("content-type", "application/json")
	w.Write([]byte(`{"message":"Hello"}`))
}

// Submit request
func Submit(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		var reqBody, err = ioutil.ReadAll(r.Body)
		if err != nil {
			fail(fmt.Sprintf("Failed to extract body from request: %s", err), w)
			log.Fatal("Failed to extract body from request: #{err}")
			return
		}

		log.Printf("Received body: %s", reqBody)

		var submission houseSubmission
		err = json.Unmarshal(reqBody, &submission)
		if err != nil {
			fail(fmt.Sprintf("Failed to deserialize json: %s", err), w)
			log.Fatal("Failed to deserialize json: #{err}")
			return
		}

		result, err := queue.Queue(submission.URL)

		w.WriteHeader(http.StatusOK)
		w.Header().Set("content-type", "application/json")
		res := fmt.Sprintf(`{"message":"%s"}`, result)
		_, err = w.Write([]byte(res))
		if err != nil {
			log.Fatalf("Failed to write response body: #{err}")
		}
	default:
		w.WriteHeader(http.StatusNotFound)
	}
}

func fail(s string, w http.ResponseWriter) {
	w.WriteHeader(http.StatusInternalServerError)
	w.Header().Set("content-type", "application/json")
	res := fmt.Sprintf(`{"message":"%s"}`, s)
	_, err := w.Write([]byte(res))
	if err != nil {
		log.Fatalf("Failed to write response body: #{err}")
	}
}
