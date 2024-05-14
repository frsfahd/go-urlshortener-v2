package models

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func SavetoMongo(link_data Link, linkCollection *mongo.Collection, ctx context.Context) error {
	// save to DB (idempotent), using upsert (update/insert) mechanism of mongoDB
	option := options.FindOneAndUpdate().SetUpsert(true).SetReturnDocument(options.After)

	err := linkCollection.FindOneAndUpdate(ctx, bson.M{"keyword": link_data.Keyword}, bson.M{"$set": link_data}, option).Decode(&link_data)

	return err
}

func RetrievefromMongo(keyword string, link *Link, linkCollection *mongo.Collection, ctx context.Context) error {
	opts := options.FindOne().SetProjection(bson.M{"long_url": 1})
	err := linkCollection.FindOne(ctx, bson.M{"keyword": keyword}, opts).Decode(link)

	// log.Println(link.Long_URL)

	return err
}
