package queue

import (
	"encoding/json"
	"log"

	"github.com/streadway/amqp"
)

type houseRequest struct {
	URL string `json:"url"`
}

// Queue url for processing
func Queue(url string) (string, error) {
	var qu string = "amqp://guest:guest@rabbitmq:5672/"

	conn, err := amqp.Dial(qu)
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

	hr := houseRequest{
		URL: url,
	}
	body, err := json.Marshal(hr)
	handleError(err, "Error marshalling to obj for queue")

	err = amqpChannel.Publish("", queue.Name, false, false, amqp.Publishing{
		ContentType: "text/plain",
		Body:        []byte(body),
	})
	handleError(err, "Failed to publish message")

	return "", nil
}

func handleError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}
