package controllers

import (
	"fmt"
	"go-backend/model"
	"net/http"
	"os"
	"time"

	"go-backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	// "go.mongodb.org/mongo-driver/bson/primitive"
)


// The string "my_secret_key" is just an example and should be replaced with a secret key of sufficient length and complexity in a real-world scenario.

func GetSecretKey () string {
	err:= godotenv.Load()

    if err != nil {
        fmt.Printf("Error loading .env file")
    }
	jwtKey := os.Getenv("JWT_SECRET_KEY")
	return jwtKey
}

var key = GetSecretKey()
var jwtKey = []byte(key)


// Create a struct that will be encoded to a JWT.
// We add jwt.RegisteredClaims as an embedded type, to provide fields like expiry time
type Claims struct {
	Email string `gorm:"type:varchar(100);uniqueIndex" json:"email"`
	jwt.RegisteredClaims
}


func Login(c *gin.Context) {
	
	var user model.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var existingUser model.User

	model.DB.Where("email = ?", user.Email).First(&existingUser)

	if existingUser.ID == 0 {
		c.JSON(400, gin.H{"error": "user does not exist"})
		return
	}

	errHash := utils.CompareHashPassword(user.Password, existingUser.Password)

	if !errHash {
		c.JSON(400, gin.H{"error": "invalid password"})
		return
	}

	expirationTime := time.Now().Add(1 * time.Minute)
	// Create the JWT claims, which includes the username and expiry time
	claims := &Claims{
		Email: user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the JWT string
	accessToken, err := token.SignedString(jwtKey)
	if err != nil {
		// If there is an error in creating the JWT return an internal server error
		c.JSON(401, gin.H{"Error": "Unauthorized access"})
		return
	}

	refreshToken := jwt.New(jwt.SigningMethodHS256)
	rtClaims := refreshToken.Claims.(jwt.MapClaims)
	rtClaims["email"] = user.Email
	rtClaims["exp"] = time.Now().Add(time.Hour * 24).Unix()
	token_refresh, err := refreshToken.SignedString(jwtKey)
	if err != nil {
		// If there is an error in creating the JWT return an internal server error
		c.JSON(401, gin.H{"Error": "Unauthorized access"})
		return 
	}

	// storing in cookies
	// fmt.Print(tokenString, " access ")
	// // c.SetCookie("access_token", tokenString, 3600, "/", "localhost", false, false )
	
	c.JSON(200, gin.H{"success":"successfully logged in", "access": accessToken, "refresh": token_refresh})

}


func Signup(c *gin.Context) {
	// fmt.Println(c.Request.ParseForm())
	// // print the payload
	// fmt.Println(c.Request.PostForm)
	var newUser model.User

	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	fmt.Println(newUser)

	var existingUser model.User

	model.DB.Where("email = ?", newUser.Email).First(&existingUser)
	fmt.Print("existing user ")
	fmt.Println(existingUser.Email)

	if existingUser.ID != 0 {
		c.JSON(400, gin.H{"error": "user already exists"})
		return
	}

	// hash the password
	hashedPassword, err := utils.GenerateHashPassword(newUser.Password)

	if err != nil {
		c.JSON(500, gin.H{"error": "could not hash password"})
		return
	}

	newUser.Password = hashedPassword


	// create the user

	model.DB.Create(&newUser)

	c.JSON(200, gin.H{"success": "user signed up"})
	
}

func GetUsers(c *gin.Context){
	
	var users []model.User

	if err := model.DB.Find(&users).Error ; err != nil {
		c.JSON(500, gin.H{"error": "error getting the users"})
		return
	}

	c.JSON(200, users)
}


func RefreshToken(c *gin.Context) {
	
	type RefreshTokenRequest struct {
		RefreshToken string `json:"refresh"`
	}
	
	var request RefreshTokenRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		// Handle the error, e.g., log it and return an error response
		fmt.Println("Error binding JSON:", err)
		return
	}
	refresh_token := request.RefreshToken

	var claims Claims

	tkn, err := jwt.ParseWithClaims(refresh_token, &claims, func(token *jwt.Token) (interface{}, error) {
        return jwtKey, nil
    })

	fmt.Printf(claims.Email)

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
	
	expirationTime := time.Now().Add(1 * time.Minute)

	claims.RegisteredClaims.ExpiresAt = jwt.NewNumericDate(expirationTime)

	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the JWT string
	accessToken, err := token.SignedString(jwtKey)
	if err != nil {
		// If there is an error in creating the JWT return an internal server error
		c.JSON(401, gin.H{"Error": "Unauthorized access"})
		return
	}

	refreshToken := jwt.New(jwt.SigningMethodHS256)
	rtClaims := refreshToken.Claims.(jwt.MapClaims)
	rtClaims["email"] = claims.Email
	rtClaims["exp"] = time.Now().Add(time.Hour * 24).Unix()
	token_refresh, err := refreshToken.SignedString(jwtKey)
	if err != nil {
		// If there is an error in creating the JWT return an internal server error
		c.JSON(401, gin.H{"Error": "Unauthorized access"})
		return 
	}

	// storing in cookies
	// fmt.Print(tokenString, " access ")
	// // c.SetCookie("access_token", tokenString, 3600, "/", "localhost", false, false )
	
	c.JSON(200, gin.H{"success":"Token refreshed ", "access": accessToken, "refresh": token_refresh})	

}