package router

import (
	"net/http"
	assignmentRouter "server/src/router/assignment_router"
	"server/src/router/middleware"
	userRouter "server/src/router/user_router"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func GetRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.Default())

	// Rotes
	v1 := r.Group("/api/v1")
	{
		v1.GET("/ping", pingRoute)
	}

	// User routes
	userGroup := v1.Group("/user")
	{
		userGroup.POST("/register", userRouter.HandleRegister)
		userGroup.POST("/login", userRouter.HandleLogIn)
	}

	// Assignment routes
	assignmentGroup := v1.Group("/assignment")
	assignmentGroup.Use(middleware.AuthMiddleware)
	{
		assignmentGroup.POST("/", assignmentRouter.HandleNewAssignment)
	}

	return r
}

func pingRoute(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Pong",
	})
}
