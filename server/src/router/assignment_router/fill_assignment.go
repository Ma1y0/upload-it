package assignmentRouter

import (
	"net/http"
	db "server/src"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func HandleFillAssignment(c *gin.Context) {
	assignment_id := c.Param("id")
	user_id := c.GetString("user_id")

	// Fetch assignment
	var assignment db.Assignment
	if err := db.DB.Get(&assignment, "SELECT * FROM assignment WHERE id = $1", assignment_id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to retrivr the assignment from db",
			"error":   err.Error(),
		})
		return
	}

	// Extracts formData
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Provide form data",
			"err":     err.Error(),
		})
		return
	}

	// Creates answer record
	answer := db.Answer{
		Id:           uuid.NewString(),
		OwnerId:      user_id,
		AssignmentId: assignment_id,
	}
	if _, err := db.DB.NamedExec("INSERT INTO answer (id, owner_id, assignment_id) VALUES (:id, :owner_id, :assignment_id)", answer); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to create answer record",
			"error":   err.Error(),
		})
		return
	}

	// Save files + Creae file db entery
	// var filesUUID []string
	for _, file := range form.File {
		for _, file := range file {
			fileRecord := db.File{
				Name:     file.Filename,
				Id:       uuid.NewString(),
				AnswerId: answer.Id,
			}
			if _, err := db.DB.NamedExec("INSERT INTO file VALUES (:id, :name, :answer_id)", fileRecord); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"message": "Failed to create file record",
					"error":   err.Error(),
				})
				return
			}
			c.SaveUploadedFile(file, "./files/"+fileRecord.Id)
			// filesUUID = append(filesUUID, fileRecord.Id)
		}
	}

	// Updates ans count on assignment
	if _, err := db.DB.Exec("UPDATE assignment SET completed = $1 WHERE id = $2", assignment.Completed+1, assignment_id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to increase completed count",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Succesfully uploaded files",
	})
}
