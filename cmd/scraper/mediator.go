package main

import (
	"log"
	"net/url"

	"github.com/oppewala/house-tracking/cmd/scraper/shared"
	eh "github.com/oppewala/house-tracking/internal/errhandler"
	"github.com/oppewala/house-tracking/internal/scraping/domain"
	"github.com/oppewala/house-tracking/internal/scraping/rea"
	"github.com/pkg/errors"
)

func houseRequestMediator(hr *shared.HouseRequest) (string, error) {
	url, err := url.Parse(hr.URL)
	if err != nil {
		log.Fatalf("Failed to parse url")
		return "Failed to parse url", err
	}

	switch url.Hostname() {
	case "domain.com.au", "www.domain.com.au":
		log.Print("Matched domain")
		msg, err := domain.Handle(hr)
		eh.Fatal(err, "Domain handler failed")

		log.Printf("Handler returned: %s", msg)

		return msg, nil
	case "realestate.com.au", "www.realestate.com.au":
		log.Print("Matched REA")
		msg, err := rea.Handle(hr)
		eh.Fatal(err, "REA Handler failed")

		log.Printf("Handler returned: %s", msg)

		return msg, nil
	default:
		log.Printf("Failed to match hostname to handler: %s", url.Hostname())
		return "Failed to match hostname", errors.Errorf("Failed to match hostname to handler: %s", url.Hostname())
	}
}
