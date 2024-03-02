package model

import "gorm.io/gorm"


type User struct {
	gorm.Model
	ID          string `json:"id"`
	Username    string `json:"username"`
	Email	    string `json:"email"`
	Password    string `json:"password"`
	Gender      string `json:"gender"`
	Contact     string `json:"contact"`
	Course      string `json:"course"`
	Year        string `json:"year"`
	CreatedAt   int64  `json:"created_at"`
	UpdatedAt   int64  `json:"updated_at"`
}

