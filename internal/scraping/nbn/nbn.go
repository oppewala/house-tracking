package nbn

import (
	"github.com/oppewala/house-tracking/cmd/management/shared"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

type NbnInfo struct {
	Id   string
	Type string
}

func Nbn(address shared.Address) (NbnInfo, error) {
	query := url.Values{}
	query.Add("query", "37 Camera Walk, Coburg North")
	query.Add("timestamp", "")

	resp, err := http.Get("https://places.nbnco.net.au/places/v1/autocomplete?query=%v&timestamp=")
	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	log.Print(body)

	return NbnInfo{
		Id:   "",
		Type: "",
	}, nil
}
