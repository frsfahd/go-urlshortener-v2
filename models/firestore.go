package models

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

func SavetoFirestore(link Link, ctx context.Context, client *firestore.Client) error {

	// Start a Firestore transaction
	err := client.RunTransaction(ctx, func(ctx context.Context, tx *firestore.Transaction) error {
		// Query for documents with the specified field
		iter := tx.Documents(client.Collection("links").Where("keyword", "==", link.Keyword))
		defer iter.Stop()

		// Check if a document with the specified field exists
		doc, err := iter.Next()
		if err == iterator.Done {
			// If no document exists, create a new one
			return tx.Set(client.Collection("links").NewDoc(), link)
		} else if err != nil {
			return err
		}

		// If a document with the specified field exists, replace it
		tx.Set(doc.Ref, link)
		return nil
	})

	return err
}

func RetrievefromFirestore(keyword string, link *Link, ctx context.Context, client *firestore.Client) error {
	query := client.Collection("links").Where("keyword", "==", keyword).Documents(ctx)
	defer query.Stop()

	doc, err := query.Next()
	if err == iterator.Done {
		log.Printf("No matching documents")
	} else if err != nil {
		log.Printf("Failed to retrieve document: %v", err)
	}

	doc.DataTo(link)

	return err
}
