// // PATH: go-auth/main.go

// package main

// import (
//     "go-backend/models"
//     "go-backend/routes"
//     "log"
//     "os"

//     "github.com/gin-gonic/gin"
//     "github.com/joho/godotenv"
// )

// func main() {
//     // Create a new gin instance
//     r := gin.Default()

//     // Load .env file and Create a new connection to the database
//     err := godotenv.Load()
//     if err != nil {
//         log.Fatal("Error loading .env file")
//     }
//     config := models.Config{
//         Host:     os.Getenv("DB_HOST"),
//         Port:     os.Getenv("DB_PORT"),
//         User:     os.Getenv("DB_USER"),
//         Password: os.Getenv("DB_PASSWORD"),
//         DBName:   os.Getenv("DB_NAME"),
//         SSLMode:  os.Getenv("DB_SSLMODE"),
//     }

//     // Initialize DB
//     models.InitDB(config)

//     // Load the routes
//     routes.AuthRoutes(r)

//     // Run the server
//     r.Run(":8080")
// }






package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)

type Message struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}

func main() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/ws", handleConnections)

	go handleMessages()

	fmt.Println("Server started on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic("Error starting server: " + err.Error())
	}
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the Chat Room!")
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
    fmt.Println("handleConnections")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer conn.Close()

	clients[conn] = true

	for {
		var msg Message
		err := conn.ReadJSON(&msg)
		if err != nil {
			fmt.Println(err)
			delete(clients, conn)
			return
		}

		broadcast <- msg
	}
}

func handleMessages() {
	for {
		msg := <-broadcast

		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				fmt.Println(err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}