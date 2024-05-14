package main

import (
	"fmt"
	"log"

	"github.com/frsfahd/go-urlshortener-v2/models"
	"github.com/gofiber/fiber/v2"
)

func CreateLink(c *fiber.Ctx) error {
	HOST := c.Hostname()

	// long_url := c.FormValue("long_url")
	// keyword := c.FormValue("keyword")

	var link_data models.Link

	// it needs to parse the request body because while our web submit in form, the axios library submit in json body in default
	err := c.BodyParser(&link_data)
	if err != nil {
		return err
	}

	// log.Printf("long_url: %s", link_data.Long_URL)
	// log.Printf("keyword: %s", link_data.Keyword)

	link_data.Short_URL = fmt.Sprintf("%s/%s", HOST, link_data.Keyword)

	err = models.SavetoMongo(link_data, linkCollection, ctx)

	if err != nil {
		log.Panicln(err)
	}

	return c.Status(fiber.StatusOK).JSON(link_data)
}

func Redirect(c *fiber.Ctx) error {
	keyword := c.Params("keyword")

	// retrieve the actual link
	// get the link
	link := &models.Link{}

	err := models.RetrievefromMongo(keyword, link, linkCollection, ctx)

	if err != nil {
		log.Println(err)
	}

	// log.Println(link.Long_URL)

	return c.Redirect(link.Long_URL, fiber.StatusFound)

}
