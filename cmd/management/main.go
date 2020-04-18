package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/oppewala/house-tracking/cmd/management/shared"
	htconfig "github.com/oppewala/house-tracking/internal/config"
	htdb "github.com/oppewala/house-tracking/internal/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var database *mongo.Database
var ctx context.Context

func allContents(w http.ResponseWriter, r *http.Request) {
	var propertiesCollection = database.Collection("properties")
	// var inspectionsCollection = database.Collection("inspections")

	cursor, err := propertiesCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	var properties []bson.M
	if err = cursor.All(ctx, &properties); err != nil {
		log.Fatal(err)
	}

	fmt.Println(properties)
}

func newHouse(w http.ResponseWriter, r *http.Request) {
	var propertiesCollection = database.Collection("properties")

	// var bedrooms int32 = 4
	// var bathrooms int32 = 2
	// var parking int32 = 2

	// propertyResult, err := propertiesCollection.InsertOne(ctx, bson.D{
	// 	{"Price", "750000-820000"},
	// 	{"URL", "https://www.domain.com.au/37-camera-walk-coburg-north-vic-3058-2016127139"},
	// 	{"Bedrooms", bedrooms }
	// 	{"Bathrooms", bathrooms }
	// 	{"Bedrooms", parking }
	// 	{"Type", "House"}
	// 	{"Tags", []string{}}
	// })
	property := shared.Property{
		Price: "750000-820000",
		Address: shared.Address{
			Street:   "37 Camera Walk",
			Suburb:   "Coburg North",
			Postcode: "3058",
		},
		Bedrooms:  4,
		Bathrooms: 2,
		Parking:   2,
		References: []shared.Reference{
			shared.Reference{
				Source: "Domain",
				URL:    "https://www.domain.com.au/37-camera-walk-coburg-north-vic-3058-2016127139",
			},
		},
		Tags: []string{"omg", "nice"},
	}
	propertyResult, err := propertiesCollection.InsertOne(ctx, property)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Fprintf(w, "{ 'id': '%v' }", propertyResult.InsertedID)
}

func newInspection(w http.ResponseWriter, r *http.Request) {
	var inspectionsCollection = database.Collection("inspections")

	houseID := mux.Vars(r)["id"]

	inspectionsResult, err := inspectionsCollection.InsertMany(ctx, []interface{}{
		bson.D{
			{"house", houseID},
			{"Date", "2020-03-28"},
		},
	})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Fprintf(w, "{ 'id': '%v' }", inspectionsResult.InsertedIDs)
}

func main() {
	log.Print("Starting 'management' on :8080")

	config, err := htconfig.Retrieve()
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Config: %v", config)
	database = htdb.Connect(config)

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", allContents).Methods("GET")
	router.HandleFunc("/house", newHouse).Methods("POST")
	router.HandleFunc("/house/{id}/inspection", newInspection).Methods("POST")

	log.Fatal(http.ListenAndServe(":8080", router))

	// updateResult, err := housesCollection.UpdateMany(ctx,
	// 	bson.M{
	// 		"URL": bson.M{
	// 			"$eq": "https://www.domain.com.au/37-camera-walk-coburg-north-vic-3058-2016127139",
	// 		},
	// 	},
	// 	bson.M{
	// 		"$set": bson.M{
	// 			"Price": "500000",
	// 		},
	// 	})
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// fmt.Printf("Matched: %v | Updated: %v", updateResult.MatchedCount, updateResult.UpsertedCount)
}
