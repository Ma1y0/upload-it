package userRouter

import (
	"net/http"
	"net/mail"

	"github.com/gin-gonic/gin"
)

type registerInput struct {
	Name     string `binding:"required"`
	Email    string `binding:"required"`
	Password string `binding:"required"`
}

func HandleRegister(c *gin.Context) {
	// Validates body
	var body registerInput
	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input",
			"error":   err.Error(),
		})
		return
	}

	// Validates email
	email, err := mail.ParseAddress(body.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid email",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Hello",
		"body":    body,
		"email":   email.Address,
	})
}
