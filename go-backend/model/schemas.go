package model

import (
	"time"
	 "gorm.io/gorm"
)


type User struct {
	gorm.Model
	ID          uint `json:"id"`
	Username    string `json:"username"`
	Email	    string `gorm:"type:varchar(100);uniqueIndex" json:"email"`
	Password    string `json:"password"`
	Gender      string `json:"gender"`
	Contact     string `json:"contact"`
	Course      string `json:"course"`
	Year        string `json:"year"`
	CreatedAt    time.Time      
	UpdatedAt    time.Time
}

type Skill struct {
	gorm.Model
	ID          uint `json:"id"`
	SkillName   string `json:"skillName"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type UserSkill struct {
	gorm.Model
	ID          uint `json:"id"`
	UserID      uint `gorm:"foreignKey:ID" json:"userId"`
	SkillID     uint `gorm:"foreignKey:ID" json:"skillId"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type Freelancer struct {
	gorm.Model
	ID          uint `json:"id"`
	UserID      uint `gorm:"foreignKey:ID" json:"userId"` 
	IsVerified  bool `json:"isVerified"`
	CreatedAt    time.Time      
	UpdatedAt    time.Time
}


type Recruiter struct {
	gorm.Model
	ID          uint `json:"id"`
	UserID      uint `gorm:"foreignKey:ID" json:"userId"` 
	About     string `json:"about"`
	IsApproved  bool `json:"isApproved"`
	CreatedAt    time.Time      
	UpdatedAt    time.Time
}

type Job struct {
	gorm.Model
	ID          uint `json:"id"`
	RecruiterID uint `gorm:"foreignKey:ID" json:"recruiterId"`
	Title       string `json:"title"`
	Description string `json:"description"`
	IsOpen      bool `json:"is_open"`
	CreatedAt    time.Time      
	UpdatedAt    time.Time
}

type Application struct {
	gorm.Model
	ID          uint `json:"id"`
	JobID       uint `gorm:"foreignKey:ID" json:"jobId"`
	FreelancerID uint `gorm:"foreignKey:ID" json:"freelancerId"`
	IsSelected  bool `json:"isSelected"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type Chat struct {
	gorm.Model
	ID          uint `json:"id"`
	SenderID uint `gorm:"foreignKey:ID" json:"senderId"`
	ReceiverID uint `gorm:"foreignKey:ID" json:"receiverId"`
	Message     string `json:"message"`
	SentAt	  time.Time 
}


// import (
// 	// "go.mongodb.org/mongo-driver/bson"
// 	"go.mongodb.org/mongo-driver/bson/primitive"
// )

// type User struct {
// 	ID          primitive.ObjectID `bson:"_id, omitempty" json:"id,omitempty"`
// 	Username    string `bson:"username, omitempty" json:"username,omitempty"`
// 	Email	    string `bson:"email, omitempty" unique:"true" json:"email,omitempty"`
// 	Password    string `bson:"password, omitempty" json:"password,omitempty"`
// 	Gender	    string	`bson:"gender, omitempty" json:"gender,omitempty"`
// 	Contact     string `bson:"contact, omitempty" json:"contact,omitempty"`
// 	Program      string `bson:"program, omitempty" json:"program,omitempty"`
// 	Year		string `bson:"year, omitempty" json:"year,omitempty"`
// 	CreatedAt   int64  `bson:"created_at, omitempty" json:"created_at,omitempty"`
// 	UpdatedAt   int64  `bson:"updated_at, omitempty" json:"updated_at,omitempty"`
// }


// type Freelancer struct {
// 	ID          primitive.ObjectID `bson:"_id, omitempty" json:"id,omitempty"`
// 	UserEmail   string `bson:"user_email, omitempty" unique:"true" json:"user_email,omitempty"`
// 	Skills	  []string `bson:"skills, omitempty" json:"skills,omitempty"`
// 	IsVerified  bool `bson:"is_verified, omitempty" json:"is_verified,omitempty"`
// }


// type Recruiter struct {
// 	ID          primitive.ObjectID `bson:"_id, omitempty" json:"id,omitempty"`
// 	UserEmail   string `bson:"user_email, omitempty" unique:"true" json:"user_email,omitempty"`
// 	Company     string `bson:"company, omitempty" json:"company,omitempty"`
// 	IsApproved  bool `bson:"is_approved, omitempty" json:"is_approved,omitempty"`
// }

// type Job struct {
// 	ID          primitive.ObjectID `bson:"_id, omitempty" json:"id,omitempty"`
// 	RecruiterEmail string `bson:"recruiter_email, omitempty" json:"recruiter_email,omitempty"`
// 	Title       string `bson:"title, omitempty" json:"title,omitempty"`
// 	Description string `bson:"description, omitempty" json:"description,omitempty"`
// 	Applicants []string `bson:"applicants, omitempty" json:"applicants,omitempty"`
// 	IsOpen      bool `bson:"is_open, omitempty" json:"is_open,omitempty"`
// 	SelectedApplicants []string `bson:"selected_applicants, omitempty" json:"selected_applicant,omitempty"`
// 	CreatedAt   int64  `bson:"created_at, omitempty" json:"created_at,omitempty"`	
// }

// type Chat struct {
// 	ID          primitive.ObjectID `bson:"_id, omitempty" json:"id,omitempty"`
// 	SenderEmail string `bson:"sender_email, omitempty" json:"sender_email,omitempty"`
// 	ReceiverEmail string `bson:"receiver_email, omitempty" json:"receiver_email,omitempty"`
// 	Message     string `bson:"message, omitempty" json:"message,omitempty"`
// 	SentAt	  int64  `bson:"sent_at, omitempty" json:"sent_at,omitempty"`
// }