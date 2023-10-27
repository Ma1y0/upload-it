package main

import (
	db "server/src"
	"server/src/router"
)

func main() {
	db.ConnecToDB()
	router := router.GetRouter()

	router.Run()
}
