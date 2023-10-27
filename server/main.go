package main

import (
	db "server/src"
	"server/src/router"
)

func init() {
	db.ConnecToDB()
}

func main() {
	router := router.GetRouter()

	router.Run()
}
