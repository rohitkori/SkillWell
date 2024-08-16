package model

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Config struct {
    Host     string
    Port     string
    User     string
    Password string
    DBName   string
}

var DB *gorm.DB

func InitDB(cfg Config) {
 
    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
        cfg.User, cfg.Password, cfg.Host, cfg.Port, cfg.DBName)

    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic(err)
    }

    if err := db.AutoMigrate(&User{}, &Freelancer{}, &Recruiter{}, &Job{}, &Chat{}, &Application{}); err != nil {
        panic(err)
    }

    fmt.Println("Migrated database")

    DB = db
}
