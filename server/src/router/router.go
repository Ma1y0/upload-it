package router

import (
	"net/http"
	userRouter "server/src/router/user_router"

	"github.com/gin-gonic/gin"
)

func GetRouter() *gin.Engine {
	r := gin.Default()

	// Rotes
	v1 := r.Group("/api/v1")
	{
		v1.GET("/ping", pingRoute)
	}

	// User routes
	userGroup := v1.Group("/user")
	{
		userGroup.POST("/register", userRouter.HandleRegister)
	}

	return r
}

func pingRoute(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Pong",
	})
}
