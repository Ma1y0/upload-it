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
			"error":   err.Error(),
		})
		return
	}

	// // Fetch answers
	// answers := []db.Answer{}
	// if err := db.DB.Select(&answers, "SELECT answer.*, file.* FROM answer JOIN file ON answer.id = file.answer_id WHERE answer.assignment_id = $1", assignment_id); err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{
	// 		"message": "Failed to retrive a records from the database",
	// 		"error":   err.Error(),
	// 	})
	// 	return
	// }

	c.JSON(http.StatusOK, gin.H{
		"message":    "Succesfully found record",
		"assignment": assignment,
		// "answers":    answers,
	})

