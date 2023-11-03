package userRouter

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleUserLogOut(c *gin.Context) {
	c.SetCookie("jwt", "", -1, "/", "127.0.0.1", false, true)
	c.Status(http.StatusOK)
}
