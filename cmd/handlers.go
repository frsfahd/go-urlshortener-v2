package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateLink(c *fiber.Ctx) error {
	HOST := c.Hostname()

	// long_url := c.FormValue("long_url")
	// keyword := c.FormValue("keyword")

	var link_data Link

	// it needs to parse the request body because while our web submit in form, the axios library submit in json body in default
	err := c.BodyParser(&link_data)
	if err != nil {
		return err
	}

	log.Printf("long_url: %s", link_data.Long_URL)
	log.Printf("keyword: %s", link_data.Keyword)

	link_data.Short_URL = fmt.Sprintf("%s/%s", HOST, link_data.Keyword)

	// link_data := Link{
	// 	Long_URL:  long_url,
	// 	Keyword:   keyword,
	// 	Short_URL: short_url,
	// }

	// save to DB (idempotent), using upsert (update/insert) mechanism of mongoDB
	option := options.FindOneAndUpdate().SetUpsert(true).SetReturnDocument(options.After)

	err = linkCollection.FindOneAndUpdate(ctx, bson.M{"keyword": link_data.Keyword}, bson.M{"$set": link_data}, option).Decode(&link_data)

	if err != nil {
		log.Panic(err)
		return err
	}

	return c.Status(fiber.StatusOK).JSON(link_data)
}

func Redirect(c *fiber.Ctx) error {
	keyword := c.Params("keyword")

	// retrieve the actual link
	// get the link
	link := Link{}
	opts := options.FindOne().SetProjection(bson.M{"long_url": 1})
	err := linkCollection.FindOne(ctx, bson.M{"keyword": keyword}, opts).Decode(&link)

	if err != nil {
		log.Println(err)
	}

	log.Println(link.Long_URL)

	return c.Redirect(link.Long_URL, fiber.StatusFound)

}
