package userRouter

import (
	"net/http"
	db "server/src"

	"github.com/gin-gonic/gin"
)

// This function is called from the front-end multiple times to updates user's data
// It reads user's if form jwt token
func HandelUpdateUserData(c *gin.Context) {
	id := c.GetString("user_id")

	var user db.User
	if err := db.DB.Get(&user, "SELECT * FROM user WHERE id = $1", id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to retrive user's data form database",
			"error":   err.Error(),
		})
		return
	}

	assignments := []db.Assignment{}
	if err := db.DB.Select(&assignments, "SELECT * FROM assignment WHERE owner_id = $1", id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to retrive user's assignments",
			"error":   err.Error(),
		})
		return
	}

	user.Password = ""

	c.JSON(200, gin.H{
		"message":     "Succesfully retrived users info",
		"user":        user,
		"assignments": assignments,
	})
}
