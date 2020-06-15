package errhandler

import "log"

// Fatal log if err has value
func Fatal(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}
