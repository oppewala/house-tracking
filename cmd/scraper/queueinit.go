package main

import (
	"encoding/json"
	"log"
	"os"

	"github.com/oppewala/house-tracking/cmd/scraper/shared"
	eh "github.com/oppewala/house-tracking/internal/errhandler"
	"github.com/streadway/amqp"
)

func queueHandler() {
	var url string = "amqp://guest:guest@rabbitmq:5672/"

	conn, err := amqp.Dial(url)
	eh.Fatal(err, "Failed to connect to amqp")
	defer conn.Close()

	amqpChannel, err := conn.Channel()
	eh.Fatal(err, "Failed to open channel to amqp")
	defer amqpChannel.Close()

	// https://godoc.org/github.com/streadway/amqp#Channel.QueueDeclare
	queue, err := amqpChannel.QueueDeclare("add", true, false, false, false, nil)
	eh.Fatal(err, "Could not declare 'add' queue")

	// https://godoc.org/github.com/streadway/amqp#Channel.Qos
	err = amqpChannel.Qos(1, 0, false)
	eh.Fatal(err, "Could not configure QoS")

	// https: //godoc.org/github.com/streadway/amqp#Channel.Consume
	messageChannel, err := amqpChannel.Consume(queue.Name, "", false, false, false, false, nil)
	eh.Fatal(err, "Could not register consumer")

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

			res, err := houseRequestMediator(houseRequest)
			if err != nil {
				log.Printf("Failed to handle request: %s", err)
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
