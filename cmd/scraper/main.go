package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"

	"github.com/oppewala/house-tracking/cmd/scraper/domain"
	"github.com/oppewala/house-tracking/cmd/scraper/rea"
	"github.com/oppewala/house-tracking/cmd/scraper/shared"
	"github.com/pkg/errors"
	"github.com/streadway/amqp"
)

// Response message for success or handled failures
type Response struct {
	Message string `json:"message"`
}

func main() {
	http.HandleFunc("/submit", submit)

	queueInput()

	log.Printf("Starting 'Scraper' on :5001")
	log.Fatal(http.ListenAndServe(":5001", nil))
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

	msg := &shared.HouseRequest{}
	err = json.Unmarshal(b, msg)
	if err != nil {
		log.Fatalf("Failed to unmarshal json")
		http.Error(w, err.Error(), 500)
		return
	}

	res, err := handleHouseRequest(msg)
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

func queueInput() {
	var url string = "amqp://guest:guest@localhost:5672/"

	conn, err := amqp.Dial(url)
	handleError(err, "Failed to connect to amqp")
	defer conn.Close()

	amqpChannel, err := conn.Channel()
	handleError(err, "Failed to open channel to amqp")
	defer amqpChannel.Close()

	// https://godoc.org/github.com/streadway/amqp#Channel.QueueDeclare
	queue, err := amqpChannel.QueueDeclare("add", true, false, false, false, nil)
	handleError(err, "Could not declare 'add' queue")

	// https://godoc.org/github.com/streadway/amqp#Channel.Qos
	err = amqpChannel.Qos(1, 0, false)
	handleError(err, "Could not configure QoS")

	// https: //godoc.org/github.com/streadway/amqp#Channel.Consume
	messageChannel, err := amqpChannel.Consume(queue.Name, "", false, false, false, false, nil)
	handleError(err, "Could not register consumer")

	stopChan := make(chan bool)

	go func() {
		log.Printf("Consumer ready, PID: %d", os.Getpid())
		for d := range messageChannel {
			log.Printf("Received a message: %s", d.Body)

			houseRequest := &shared.HouseRequest{}

			err := json.Unmarshal(d.Body, houseRequest)
			if err != nil {
				log.Printf("Error decoding json: %s", err)
			}

			res, err := handleHouseRequest(houseRequest)
			if err != nil {
				log.Printf("%s: %s", "Failed to handle request", err)
			}

			log.Printf("Handled with response: %s", res)

			if err := d.Ack(false); err != nil {
				log.Printf("Error acknowledging message: %s", err)
			} else {
				log.Print("Acknowledged message")
			}
		}
	}()

	<-stopChan
}

func handleHouseRequest(hr *shared.HouseRequest) (string, error) {
	url, err := url.Parse(hr.URL)
	if err != nil {
		log.Fatalf("Failed to parse url")
		return "Failed to parse url", err
	}

	switch url.Hostname() {
	case "domain.com.au", "www.domain.com.au":
		log.Print("Matched domain")
		msg, err := domain.Handle(hr)
		handleError(err, "Domain Handler failed")

		log.Printf("Handler returned: %s", msg)

		return msg, nil
	case "realestate.com.au", "www.realestate.com.au":
		log.Print("Matched REA")
		msg, err := rea.Handle(hr)
		handleError(err, "REA Handler failed")

		log.Printf("Handler returned: %s", msg)

		return msg, nil
	default:
		log.Printf("Failed to match hostname to handler: %s", url.Hostname())
		return "Failed to match hostname", errors.Errorf("Failed to match hostname to handler: %s", url.Hostname())
	}
}

func handleError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}
