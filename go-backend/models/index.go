package models

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
    SSLMode  string
}

var DB *gorm.DB

func InitDB(cfg Config) {

    createDBDsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/", cfg.User, cfg.Password, cfg.Host, cfg.Port)
    database, err := gorm.Open(mysql.Open(createDBDsn), &gorm.Config{})

    // Create Database if it doesn't exists
    _ = database.Exec("CREATE DATABASE IF NOT EXISTS " + cfg.DBName + ";")

    //postgresql dsn
    // dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s", cfg.Host, cfg.User, cfg.Password, cfg.DBName, cfg.Port, cfg.SSLMode)
  
    //mysql dsn
    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", cfg.User, cfg.Password, cfg.Host, cfg.Port, cfg.DBName)
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
        DisableForeignKeyConstraintWhenMigrating: true,
      })

    // for auto-migration of tables in database
    db.AutoMigrate(&User{},&Skill{}, &Freelancer{}, &Recruitor{})

    // fmt.Println(db.Migrator().CurrentDatabase()) 
    
    // create foreign key constraints
    // db.Migrator().CreateConstraint(&Freelancer{}, "Skills")
    // db.Migrator().CreateConstraint(&Freelancer{}, "User")
    // db.Migrator().CreateConstraint(&Recruitor{}, "User")

    // fmt.Println(db.Migrator().HasConstraint(&Freelancer{}, "User"))
    // fmt.Println(db.Migrator().HasConstraint(&Recruitor{}, "User"))

    if err != nil {
        panic(err)
    }

    if err := db.AutoMigrate(&User{}); err != nil {
        panic(err)
    }

    fmt.Println("Migrated database")

    DB = db
}
