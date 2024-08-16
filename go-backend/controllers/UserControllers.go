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

func BecomeRecruiter(c *gin.Context){
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
    var recruiter model.Recruiter

	model.DB.Where("email = ?", claims.Email).First(&user)

    recruiter.UserID = user.ID


    if err := c.BindJSON(&recruiter); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	} // Bind the JSON to the struct means the JSON data will be converted to the struct

    model.DB.Create(&recruiter)

    c.JSON(http.StatusAccepted, gin.H{"message": "You are now a recruiter"})

}

func BecomeFreelancer(c *gin.Context){
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
    var freelancer model.Freelancer

	model.DB.Where("email = ?", claims.Email).First(&user)

    freelancer.UserID = user.ID


    if err := c.BindJSON(&freelancer); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	} // Bind the JSON to the struct means the JSON data will be converted to the struct

    model.DB.Create(&freelancer)

    c.JSON(http.StatusAccepted, gin.H{"message": "You are now a freelancer"})
    
}

func GetSkills (c *gin.Context){
    var skills []model.Skill // create a slice of skills, slice means an array

    if err := model.DB.Find(&skills).Error ; err != nil { // find all the skills in the database
        c.JSON(500, gin.H{"error": "error getting the skills"})
        return
    }

    c.JSON(200, skills)

}

func AddSkill (c *gin.Context){
    var skill model.Skill

    if err := c.BindJSON(&skill); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    } // Bind the JSON to the struct means the JSON data will be converted to the struct

    model.DB.Create(&skill)

    c.JSON(http.StatusAccepted, gin.H{"message": "Skill added"})

}

func GetJobs (c *gin.Context){
    var jobs []model.Job

    if err := model.DB.Find(&jobs).Error ; err != nil {
        c.JSON(500, gin.H{"error": "error getting the jobs"})
        return
    }

    c.JSON(200, jobs)
}

func PostJob(c *gin.Context){
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
    var recruiter model.Recruiter

	model.DB.Where("email = ?", claims.Email).First(&user)

    model.DB.Where("user_id = ?", user.ID).First(&recruiter)

    var job model.Job

    if err := c.BindJSON(&job); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    } // Bind the JSON to the struct means the JSON data will be converted to the struct

    job.RecruiterID = recruiter.ID
    
    model.DB.Create(&job)

    c.JSON(http.StatusAccepted, gin.H{"message": "Job posted"})
}





// func GetJobsByRecruiter(c *gin.Context) {
//     var authHeader = c.Request.Header.Get("Authorization")

// 	// Check if the Authorization header is present and starts with "Bearer "
//     if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
//         c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing or invalid"})
//         return
//     }

//     // Remove the "Bearer " prefix to get the JWT
//     access_token := strings.TrimPrefix(authHeader, "Bearer ")

//     var claims Claims

// 	// parse the token and its payload into claims
//     tkn, err := jwt.ParseWithClaims(access_token, &claims, func(token *jwt.Token) (interface{}, error) {
//         return jwtKey, nil
//     })


//     if err != nil {
	
//         if err == jwt.ErrSignatureInvalid {
//             c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
//         } 
//         c.JSON(http.StatusBadRequest, gin.H{"error": "bad request"})
// 		return
        
//     }

//     if !tkn.Valid {
//         c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
//         return // Stop execution after sending an error response
//     }

//     var user model.User

// 	model.DB.Where("email = ?", claims.Email).First(&user)

//     var recruiter model.Recruiter

//     model.DB.Where(("user"))


// }