
 package models

 import (
    "gorm.io/gorm"
    "time"
    )

 type User struct { 
    gorm.Model
    ID      uint   `json:"id" gorm:"primary_key"`
    UserName  string `gorm:"unique" json:"username"`
    Email    string `gorm:"unique" json:"email"`
    Password string `json:"password"`
    FirstName string `json:"firstname"`
    LastName string `json:"lastname"`     
    Gender string `json:"gender"`
    Contact string `json:"contact"`
    Course string `json:"course"`
    CurrentYear string `json:"currentyear"`
    Branch string `json:"branch"`
    ProfilePic string `json:"profilepic"`
    Instagram string `json:"instagram"`
    Facebook string `json:"facebook"`
    Linkedin string `json:"linkedin"`
    Github string `json:"github"`
    Twitter string `json:"twitter"`
    Website string `json:"website"`
    CreatedAt time.Time
    UpdatedAt time.Time
 }


 type Skill struct {
    gorm.Model
    ID      uint   `json:"id" gorm:"primary_key"`
    Name string `gorm:"unique" json:"name"`
    Description string `json:"description"`
 }

 type Freelancer struct {
    gorm.Model
    ID      uint   `json:"id" gorm:"primary_key"`
    User    User   `json:"user" gorm:"foreignKey:UserName" `
    About string `json:"about"`
    Skills  []Skill `gorm:"foreignKey:name;" json:"skills"`
    IsVerified bool `json:"isverified"`
 }

 type Recruitor struct {
    gorm.Model
    ID      uint   `json:"id" gorm:"primary_key"`
    User    User   `json:"user" gorm:"foreignKey:UserName" `
    About string `json:"about"`
    IsApproved bool `json:"isapproved"`
 }