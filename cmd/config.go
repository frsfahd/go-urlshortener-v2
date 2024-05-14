package main

import (
	"context"
	"log"
	"os"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go/v4"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"google.golang.org/api/option"
)

var (
	ENV            string
	HOST           string
	PORT           string
	mongoClient    *mongo.Client
	linkCollection *mongo.Collection
	ctx            context.Context
	DB_NAME        string
	DB_COLLECTION  string
	client         *firestore.Client
)

func configEnv() {
	// load .env file for dev
	if err := godotenv.Load(); err != nil {
		log.Printf("error loading .env file: %s", err)
	}

	// setup server
	PORT = os.Getenv("PORT")
	HOST = os.Getenv("HOST")
	ENV = os.Getenv("ENV")

	log.Printf("%s:%s", HOST, PORT)
	log.Printf("environment: %s", ENV)
}

func configDB() {
	// setup database

	DB_URL := os.Getenv("DB_URL")
	connectionOpts := options.Client().ApplyURI(DB_URL)

	mongoClient, err := mongo.Connect(ctx, connectionOpts)
	if err != nil {
		log.Fatalf("an error ocurred when connect to mongoDB : %v", err)
	}

	// test database connection
	if err = mongoClient.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatalf("an error ocurred when connect to mongoDB : %v", err)
	}

	log.Println("database connected")

	// get collection
	DB_NAME = os.Getenv("DB_NAME")
	DB_COLLECTION = os.Getenv("DB_COLLECTION")
	linkCollection = mongoClient.Database(DB_NAME).Collection(DB_COLLECTION)
}

func configFirestore() {
	// Use a service account
	sa := option.WithCredentialsFile("./firebase-service-acc.json")
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalln(err)
	}

	client, err = app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}

}
