package assignmentRouter

import (
	"net/http"
	db "server/src"

	"github.com/gin-gonic/gin"
)

func GetAnswers(c *gin.Context) {
	assignment_id := c.Param("id")

	var answers []db.Answer
	if err := db.DB.Select(&answers, "SELECT * FROM answer WHERE assignment_id = $1", assignment_id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Error",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Ok",
		"answers": answers,
	})
}
