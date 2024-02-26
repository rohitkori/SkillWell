import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import SocketConnection from "../../socket-connection";


const Chat = () => {
  // const navigate = useNavigate();
  const [socketConn, setSocketConn] = useState("");

  useEffect(() => {
    const conn = new SocketConnection();
    conn.connect((msg) => {
      console.log(msg);
    });
    setSocketConn(conn);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    socketConn.sendMsg("hello")
  }

  return (
    <>
    <h1>Chat</h1>
    <form onSubmit={handleSubmit}>
        <input type="text" />
        <input type="submit"/>
      </form>
      </>
  )
}

export default Chat;