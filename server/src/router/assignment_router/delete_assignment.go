package assignmentRouter

import (
	"net/http"
	db "server/src"

	"github.com/gin-gonic/gin"
)

func HandleDeleteAssignment(c *gin.Context) {
	// Gets user id form jwt
	user_id := c.GetString("user_id")
	// Get id of assignment form path
	id := c.Param("id")

	// Fetch the assignment
	var assignment db.Assignment
	if err := db.DB.Get(&assignment, "SELECT * FROM assignment WHERE id = $1", id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to get the assignment from db",
			"err":     err.Error(),
		})
		return
	}

	if assignment.OwnerId != user_id {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "This assignment doesn't belong to you!",
		})
		return
	}

	if _, err := db.DB.Exec("DELETE FROM assignment WHERE id = $1", id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to delete the record",
		})
	}
}
