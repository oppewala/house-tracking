package htdb

import (
	"context"
	"log"
	"time"

	htconfig "github.com/oppewala/house-tracking/internal/config"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// Connect to database
func Connect(config *htconfig.Configuration) (disconnect func(), db *mongo.Database) {
	log.Printf("Connecting to: %v", config.MongoDB)

	client, err := mongo.NewClient(options.Client().ApplyURI(config.MongoDB))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	// defer client.Disconnect(ctx)

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	log.Print("Connected to db")

	return func() {
		client.Disconnect(ctx)
	}, client.Database("house-tracking")
}
