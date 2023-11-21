package assignmentRouter

import (
	"net/http"
	db "server/src"

	"github.com/gin-gonic/gin"
)

func HandleGetAssignmentById(c *gin.Context) {
	// user_id := c.GetString("user_id") // jwt token
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

	// if assignment.OwnerId != user_id {
	// 	c.JSON(http.StatusUnauthorized, gin.H{
	// 		"message": "Assignment doesn't belong to you",
	// 	})
	// 	return
	// }

	// Fetch answers
	// type answers_files struct {
	// 	db.Answer
	// 	Files []db.File
	// }
	//
	// answers := []answers_files{}
	// if err := db.DB.Select(&answers, `
	// 		SELECT answer.*, file.id as file_id, file.name as file_name, file.answer_id as file_answer_id
	// 		FROM answer
	// 		LEFT JOIN file ON answer.id = file.answer_id
	// 		WHERE answer.assignment_id = $1`,
	// 	assignment_id); err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{
	// 		"message": "Failed to retrive a records from the database",
	// 		"error":   err.Error(),
	// 	})
	// 	return
	// }

	c.JSON(http.StatusOK, gin.H{
		"message":    "Succesfully found record",
		"assignment": assignment,
	})
}
