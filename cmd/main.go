package main

import (
	"io/fs"
	"log"
	"net/http"

	"github.com/frsfahd/go-urlshortener-v2/web"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
)

func init() {
	configEnv()
	configDB()

}

func main() {
	app := fiber.New()

	index, err := fs.Sub(web.Index, "dist")
	if err != nil {
		panic(err)
	}

	app.Use("/", filesystem.New(filesystem.Config{
		Root:   http.FS(index),
		Index:  "index.html",
		Browse: false,
	}))

	app.Get("/:keyword", Redirect)

	app.Get("/hello", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	api := app.Group("/api")

	v1 := api.Group("/v1")

	v1.Post("/shorten", CreateLink)

	log.Fatal(app.Listen(":" + PORT))
}
