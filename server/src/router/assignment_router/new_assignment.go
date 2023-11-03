package assignmentRouter

import (
	"net/http"
	db "server/src"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type newAssignmentInput struct {
	Title       string `binding:"required"`
	Description string `binding:"required"`
	Due         string `binding:"required"`
}

func HandleNewAssignment(c *gin.Context) {
	// Gets user id for JWt
	user_id := c.GetString("user_id")

	// Validates body
	var body newAssignmentInput
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input",
			"error":   err.Error(),
		})
		return
	}

	// Creates a new Assignment
	newAssignment := db.Assignment{
		Id:          uuid.NewString(),
		Title:       body.Title,
		Due:         body.Due,
		Completed:   0,
		Description: body.Description,
		OwnerId:     user_id,
	}

	if _, err := db.DB.NamedExec("INSERT INTO assignment VALUES (:id, :title, :description, :owner_id, :due, :completed)", newAssignment); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to inser new assignment into database",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully creates new assignment",
		"id":      newAssignment,
	})
}
