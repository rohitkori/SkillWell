package routes

import (
	"go-backend/controllers"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {
    r.POST("login/", controllers.Login)
    r.POST("login/refresh/", controllers.RefreshToken)
    r.GET("get-users/", controllers.GetUsers)
    r.POST("signup/", controllers.Signup)
    r.GET("users/me/", controllers.GetUserDetails)
    // r.GET("/home", controllers.Home)
    // r.GET("/premium", controllers.Premium)
    // r.GET("/logout", controllers.Logout)
}