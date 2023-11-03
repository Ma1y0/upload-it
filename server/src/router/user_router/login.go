package userRouter

import (
	"net/http"
	"os"
	db "server/src"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type logInInput struct {
	Email    string `binding:"required"`
	Password string `binding:"required"`
}

func HandleLogIn(c *gin.Context) {
	// Validates body
	var body logInInput
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input",
			"error":   err.Error(),
		})
		return
	}

	// Find user record by email
	var user db.User
	if err := db.DB.Get(&user, "SELECT * FROM user WHERE email = $1", body.Email); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "User not found",
			"error":   err.Error(),
		})
		return
	}

	// Compare password and hash
	if !compareHashAndPassword(body.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Wrong password",
		})
		return
	}

	// Generate JWT token
	jwt_token, err := generateJWT(user.Id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to generate JWT token",
			"error":   err.Error(),
		})
		return
	}

	// Add jwt to the Cookie
	c.SetCookie("jwt", jwt_token, 86400, "/", "127.0.0.1", false, true)

	// Load users assigments
	assigments := []db.Assignment{}
	if err := db.DB.Select(&assigments, "SELECT * FROM assignment WHERE owner_id = $1", user.Id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to retrive user's assigments",
			"error":   err.Error(),
		})
	}

	c.JSON(200, gin.H{
		"id":          user.Id,
		"assignments": assigments,
		"name":        user.Name,
		"email":       user.Email,
	})
}

func comparePasswordAndHash(password string, hash string) bool {
	if err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)); err != nil {
		return false
	}

	return true
}

func generateJWT(user_id string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
	claims["user_id"] = user_id

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	return tokenString, err
}

func compareHashAndPassword(password string, hash string) bool {
	if err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)); err != nil {
		return false
	}

	return true
}
