package properties_repo

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"

	"github.com/oppewala/house-tracking/internal/htconfig"
	"github.com/oppewala/house-tracking/internal/htdbtypes"
)

type propertyRepo struct {
	db         *mongo.Database
	disconnect func()
}

type PropertyRepository interface {
	All() ([]htdbtypes.Property, error)
	Add(property htdbtypes.Property) (*primitive.ObjectID, error)
	Close()
}

var Repo = newRepo()

func newRepo() PropertyRepository {
	c, err := htconfig.Retrieve()
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Connecting to: %v", c.MongoDB)

	client, err := mongo.NewClient(options.Client().ApplyURI(c.MongoDB))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	log.Print("Connected to htdb")
	return &propertyRepo{
		db: client.Database("house-tracking"),
		disconnect: func() {
			client.Disconnect(ctx)
		},
	}
}

func (repo *propertyRepo) All() ([]htdbtypes.Property, error) {
	var propertiesCollection = repo.db.Collection("properties")
	// var inspectionsCollection = database.Collection("inspections")

	cursor, err := propertiesCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		return nil, err
	}

	var properties []htdbtypes.Property
	if err = cursor.All(context.TODO(), &properties); err != nil {
		return nil, err
	}

	return properties, nil
}

func (repo *propertyRepo) Add(property htdbtypes.Property) (*primitive.ObjectID, error) {
	var propertiesCollection = repo.db.Collection("properties")

	var existingProperty htdbtypes.Property
	err := propertiesCollection.FindOne(context.TODO(), bson.M{
		"address.street":   property.Address.Street,
		"address.suburb":   property.Address.Suburb,
		"address.postcode": property.Address.Postcode}).Decode(&existingProperty)

	if err == nil {
		return nil, fmt.Errorf("add property failed: property already exists with matching address (%v, %v, %v)", property.Address.Street, property.Address.Suburb, property.Address.Postcode)
	}

	property.ID = primitive.NewObjectID()

	_, err = propertiesCollection.InsertOne(context.TODO(), property)
	if err != nil {
		return nil, fmt.Errorf("failed to insert property: %v", err)
	}

	return &property.ID, nil
}
func (repo *propertyRepo) Close() {
	repo.disconnect()
}
