package assignmentRouter

import (
	"net/http"
	db "server/src"

	"github.com/gin-gonic/gin"
)

func HandleGetAssignmentById(c *gin.Context) {
	assignment_id := c.Param("id") // Path

	// Fetch the assignment
	var assignment db.Assignment
	if err := db.DB.Get(&assignment, "SELECT * FROM assignment WHERE id = $1", assignment_id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to retrive a record from the database",
			"err":     err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":    "Succesfully found record",
		"assignment": assignment,
	})
}
