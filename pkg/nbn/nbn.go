package nbn

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// Address is input for the initial search
type Address struct {
	Street   string
	Suburb   string
	Postcode string
	State    string
}

// Suggestion is returned from the initial search with potential matches
type Suggestion struct {
	ID               string
	FormattedAddress string
	Latitude         float64
	Longitude        float64
}

// AddressDetail is returned from the final lookup with details on the LOC
type AddressDetail struct {
	AddressStatus         string
	ServiceType           string
	ServiceStatus         string
	TechType              string
	ServiceabilityMessage string
	StatusMessage         string
}

type searchResponse struct {
	Timestamp   int64
	Source      string
	Suggestions []Suggestion
}

type lookupResponse struct {
	AddressDetail AddressDetail
}

// Search for address, returning nbnco suggestions
func Search(address Address) ([]Suggestion, error) {
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
		err = fmt.Errorf("failed to execute request: %v \n Url: %v", err, u)
		return nil, err
	}
	if res.StatusCode != http.StatusOK {
		err = fmt.Errorf("received unexpected status code: %v \n Url: %v", res.StatusCode, u)
		return nil, err
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		err = fmt.Errorf("failed to read body: %v \n Url: %v \n Body: %v", err, u, string(body))
		return nil, err
	}
	var l searchResponse
	err = json.Unmarshal(body, &l)
	if err != nil {
		err = fmt.Errorf("failed to unmarshal json: %v \n Url: %v \n Body: %v", err, u, string(body))
		return nil, err
	}
	log.Printf("Response: %+v", l)

	return l.Suggestions, nil
}

// Lookup based on NBNco ID
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
		err = fmt.Errorf("failed to unmarshal json: %v \n Body: %v", err, string(body))
		return nil, err
	}

	return &l.AddressDetail, nil
}

func addressToString(a Address) (string, error) {
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
