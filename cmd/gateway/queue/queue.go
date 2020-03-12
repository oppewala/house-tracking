package queue

// Queue url for processing
func Queue(url string) (string, error) {
	// 	var url string = "amqp://guest:guest@localhost:15672/"

	// 	conn, err := amqp.Dial()
	// 	handleError(err, "Failed to connect to amqp")
	// 	defer conn.Close()

	// 	amqpChannel, err := conn.Channel()
	// 	handleError(err, "Failed to open channel to amqp")
	// 	defer amqpChannel.Close()

	// 	// https://godoc.org/github.com/streadway/amqp#Channel.QueueDeclare
	// 	queue, err := amqpChannel.QueueDeclare("add", true, false, false, false, nil)
	// 	handleError(err, "Could not declare 'add' queue")

	// 	// https://godoc.org/github.com/streadway/amqp#Channel.Qos
	// 	err = amqpChannel.Qos(1, 0, false)
	// 	handleError(err, "Could not configure QoS")

	return "", nil
}

// func handleError(err error, msg string) {
// 	if err != nil {
// 		log.Fatalf("%s: %s", msg, err)
// 	}
// }
