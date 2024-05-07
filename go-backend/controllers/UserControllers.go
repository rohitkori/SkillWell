package controllers

import (

	"go-backend/model"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)


func GetUserDetails(c *gin.Context) {
    var authHeader = c.Request.Header.Get("Authorization")

	// Check if the Authorization header is present and starts with "Bearer "
    if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing or invalid"})
        return
    }

    // Remove the "Bearer " prefix to get the JWT
    access_token := strings.TrimPrefix(authHeader, "Bearer ")

    var claims Claims

	// parse the token and its payload into claims
    tkn, err := jwt.ParseWithClaims(access_token, &claims, func(token *jwt.Token) (interface{}, error) {
        return jwtKey, nil
    })


    if err != nil {
	
        if err == jwt.ErrSignatureInvalid {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
        } 
        c.JSON(http.StatusBadRequest, gin.H{"error": "bad request"})
		return
        
    }

    if !tkn.Valid {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
        return // Stop execution after sending an error response
    }

	var user model.User

	model.DB.Where("email = ?", claims.Email).First(&user)

    c.JSON(http.StatusAccepted, gin.H{"userData": user})
}
