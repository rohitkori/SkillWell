package main

import (
	"fmt"
	"go-backend/model"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

// create a array of all the clients
var clients = make(map[*websocket.Conn]bool) // connected clients

func reader(conn *websocket.Conn) {
    for {
    // read in a message
        messageType, p, err := conn.ReadMessage()
        if err != nil {
            log.Println(err)
            return
        }
    // print out that message for clarity
        fmt.Println(string(p))

        //send message to all the clients 
        for client := range clients {
            if err := client.WriteMessage(messageType, p); err != nil {
                log.Println(err)
                return
            }
        }
        
        // send message to only the client who sent the message
        // if err := conn.WriteMessage(messageType, p); err != nil {
        //     log.Println(err)
        //     return
        // }

    }
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
    upgrader.CheckOrigin = func(r *http.Request) bool { return true }

    // upgrade this connection to a WebSocket
    // connection
    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
    }
    clients[ws] = true

    log.Println("Client Connected")
    err = ws.WriteMessage(1, []byte("Hi Client!, from server"))
    if err != nil {
        log.Println(err)
    }
    // listen indefinitely for new messages coming
    // through on our WebSocket connection
    reader(ws)
}

func homePage(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Home Page")
}


func setupRoutes() {
    http.HandleFunc("/", homePage)
    http.HandleFunc("/ws", wsEndpoint)
}

func main() {

    err := godotenv.Load()

    if err != nil {
        log.Fatal("Error loading .env file")
    }

    config := model.Config{
        Host:     os.Getenv("DB_HOST"),
        Port:     os.Getenv("DB_PORT"),
        User:     os.Getenv("DB_USER"),
        Password: os.Getenv("DB_PASSWORD"),
        DBName:   os.Getenv("DB_NAME"),
    }

    model.InitDB(config)  

    fmt.Println("Hello World")

    setupRoutes()
    log.Fatal(http.ListenAndServe(":8080", nil))
}