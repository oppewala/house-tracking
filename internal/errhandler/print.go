package eh

import "log"

// Print log if err has value
func Print(err error, msg string) {
	if err != nil {
		log.Printf("%s: %s", msg, err)
	}
}
