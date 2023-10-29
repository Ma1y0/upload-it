package middleware

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(c *gin.Context) {
	token, err := c.Cookie("jwt")
	if err != nil || token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Provide jwt token",
		})
		c.Abort()
		return
	}

	// Validates JWT
	claims, err := verifyJWT(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid JWT token",
			"error":   err.Error(),
		})
		c.Abort()
		return
	}

	user_id := claims["user_id"]

	c.Set("user_id", user_id)
	c.Next()
}

func verifyJWT(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validates te signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		return nil, fmt.Errorf("Error parsing token: %v", err)
	}

	// Validates token
	if !token.Valid {
		return nil, fmt.Errorf("Error parsing token: %v", err)
	}

	// Extract claims
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, fmt.Errorf("Error extracting claims")
	}

	return claims, nil
}
