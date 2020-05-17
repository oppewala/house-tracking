package shared

// Handler house request
type Handler interface {
	Handle(*HouseRequest) (string, error)
}

// HouseRequest is
type HouseRequest struct {
	URL string `json:"url"`
}

// HouseResult is
type HouseResult struct {
	Title     string
	Address   string
	URL       string
	Bedrooms  int32
	Bathrooms int32
	Carspaces int32
}
