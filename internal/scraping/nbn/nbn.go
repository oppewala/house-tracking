package nbn

import (
	"encoding/json"
	"fmt"
	"github.com/oppewala/house-tracking/cmd/management/shared"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"
)

type PropertyInfo struct {
	Id   string
	Type string
}

type Suggestion struct {
	Id               string
	FormattedAddress string
	Latitude         float64
	Longitude        float64
}

type searchResponse struct {
	Timestamp   int64
	Source      string
	Suggestions []Suggestion
}

type lookupResponse struct {
	AddressDetail AddressDetail
}

type AddressDetail struct {
	AddressStatus         string
	ServiceType           string
	ServiceStatus         string
	TechType              string
	ServiceabilityMessage string
	StatusMessage         string
}

func Lookup(id string) (*AddressDetail, error) {
	u := "https://places.nbnco.net.au/places/v1/details/" + id

	client := &http.Client{}
	req, _ := http.NewRequest("GET", u, nil)
	req.Header.Add("Referer", "https://www.nbnco.com.au/")
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	var l lookupResponse
	err = json.Unmarshal(body, &l)
	if err != nil {
		err = fmt.Errorf("Failed to unmarshal json: %v \n Body: %v", err, string(body))
		return nil, err
	}

	return &l.AddressDetail, nil
}

func Search(address shared.Address) ([]Suggestion, error) {
	s, err := addressToString(address)
	if err != nil {
		return nil, err
	}

	query := url.Values{}
	query.Add("query", s)
	query.Add("timestamp", timestamp())

	u := fmt.Sprintf("https://places.nbnco.net.au/places/v1/autocomplete?%v", query.Encode())

	client := &http.Client{}
	req, _ := http.NewRequest("GET", u, nil)
	req.Header.Add("Referer", "https://www.nbnco.com.au/")
	res, err := client.Do(req)
	if err != nil {
		err = fmt.Errorf("Failed to execute request: %v \n Url: %v", err, u)
		return nil, err
	}
	if res.StatusCode != http.StatusOK {
		err = fmt.Errorf("Received unexpected status code: %v \n Url: %v", res.StatusCode, u)
		return nil, err
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		err = fmt.Errorf("Failed to read body: %v \n Url: %v \n Body: %v", err, u, string(body))
		return nil, err
	}
	var l searchResponse
	err = json.Unmarshal(body, &l)
	if err != nil {
		err = fmt.Errorf("Failed to unmarshal json: %v \n Url: %v \n Body: %v", err, u, string(body))
		return nil, err
	}
	log.Printf("Response: %+v", l)

	return l.Suggestions, nil
}

func addressToString(a shared.Address) (string, error) {
	builder := strings.Builder{}
	if a.Street == "" {
		return "", fmt.Errorf("no street address provided: %+v", a)
	}
	builder.WriteString(a.Street)

	if a.Suburb != "" {
		builder.WriteString(", " + a.Suburb)
	}
	if a.Postcode != "" {
		builder.WriteString(", " + a.Postcode)
	}
	if a.State != "" {
		builder.WriteString(", " + a.State)
	}

	return builder.String(), nil
}

func timestamp() string {
	t := time.Now()
	return fmt.Sprint(t.Unix() * 1000)
}
