package main

import (
	db "server/src"
	"server/src/router"

	_ "github.com/joho/godotenv"
)

func main() {
	db.ConnecToDB()
	router := router.GetRouter()

	router.Run()
}
