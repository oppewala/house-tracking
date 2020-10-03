package htdbtypes

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Property is
type Property struct {
	ID         primitive.ObjectID    `bson:"_id,omitempty"`
	Address    Address               `bson:"address,omitempty"`
	Location   Location              `bson:"location,omitempty"`
	Price      string                `bson:"price,omitempty"`
	Layout     PropertyConfiguration `bson:"layout,omitempty"`
	RawScore   PropertyScore         `bson:"rawscore,omitempty"`
	References []Reference           `bson:"references,omitempty"`
	Tags       []string              `bson:"tags,omitempty"`
	Notes      string                `bson:"notes,omitempty"`
}

type PropertyConfiguration struct {
	Bedrooms   int32 `bson:"bedrooms,omitempty"`
	Bathrooms  int32 `bson:"bathrooms,omitempty"`
	Parking    int32 `bson:"parking,omitempty"`
	ExtraRooms bool  `bson:"extrarooms,omitempty"`
	Nbn        Nbn   `bson:"nbn,omitempty"`
}

// Location is
type Location struct {
	Latitude  float32 `bson:"latitude,omitempty"`
	Longitude float32 `bson:"longitude,omitempty"`
	PlaceID   string  `bson:"placeid,omitempty"`
}

// Address is
type Address struct {
	Street   string `bson:"street,omitempty"`
	Suburb   string `bson:"suburb,omitempty"`
	Postcode string `bson:"postcode,omitempty"`
	State    string `bson:"state,omitempty"`
}

// PropertyScore is
type PropertyScore struct {
	Quality         int32
	Safety          int32
	OutdoorArea     int32
	Bedrooms        int32
	Kitchen         int32
	PublicTransport int32
	LivingArea      int32
	Bathrooms       int32
	LocalArea       int32
}

// Reference is
type Reference struct {
	Type  string
	Value string
}

// Nbn is
type Nbn string

//goland:noinspection GoUnusedConst
const (
	FTTP    Nbn = "FTTP"
	FTTN        = "FTTN"
	FTTC        = "FTTC"
	FTTB        = "FTTB"
	HFC         = "HFC"
	Unknown     = "Unknown"
)
