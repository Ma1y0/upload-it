package userRouter

import (
	"net/http"
	"net/mail"
	db "server/src"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
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

	// Hashes new user's password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to hash new user's password",
			"error":   err.Error(),
		})
		return
	}

	newUser := db.User{
		Id:       uuid.NewString(),
		Name:     body.Name,
		Email:    email.Address,
		Password: string(hash),
	}

	_, err = db.DB.NamedExec(
		"INSERT INTO user (id, name, email, password) VALUES (:id, :name, :email, :password)",
		newUser,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to inser new user into the databse",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User successfully created",
	})
}
