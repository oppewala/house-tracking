package domain

import (
	"fmt"
	"log"

	"github.com/gocolly/colly"
	"github.com/gocolly/colly/debug"
	"github.com/oppewala/house-tracking/cmd/scraper/shared"
)

// Handle domain hosted house
func Handle(hr *shared.HouseRequest) (string, error) {
	c := colly.NewCollector(colly.Debugger(&debug.LogDebugger{}))

	var res shared.HouseResult

	c.OnHTML(".listing-details__summary-title-container", func(e *colly.HTMLElement) {
		log.Print("Found title container")

		res = shared.HouseResult{
			URL:     hr.URL,
			Title:   e.ChildText(".listing-details__summary-title"),
			Address: e.ChildText(".listing-details__listing-summary-address"),
			// Bathrooms: e.ChildText(""),
			// Bedrooms:  e.ChildText(""),
			// Carspaces: e.ChildText(""),
		}

		e.ForEach("span", func(i int, f *colly.HTMLElement) {
			log.Print("Found one: %s", f.Attr("data-testid"))

			if f.Attr("data-testid") == "property-features-text-container" {
				room := f.ChildText("span")
				switch room {
				case "Beds":
					res.Bedrooms = int32(f.Text[0] - '0')
				case "Parking":
					res.Carspaces = int32(f.Text[0] - '0')
				case "Baths":
					res.Bathrooms = int32(f.Text[0] - '0')
				}
			}
		})
	})

	c.OnScraped(func(r *colly.Response) {
		log.Print("Finished scraping")
	})

	c.Visit(hr.URL)

	printResult(&res)

	return fmt.Sprintf("Scraped '%s'", res.Address), nil
}

func printResult(hr *shared.HouseResult) {
	log.Printf("Scraped House: %s", hr.Address)
	log.Printf("Used Url: %s", hr.URL)
	log.Printf("%s", hr.Title)
	log.Printf("%v BR, %v Bath, %v Car", hr.Bedrooms, hr.Bathrooms, hr.Carspaces)
}
