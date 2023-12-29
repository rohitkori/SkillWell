import { useState } from "react";
import { connect, sendMsg } from "../api/index.jsx";
import toast from "react-hot-toast";

const Chat = () => {
  const [message, setMessage] = useState("");
  const handleSend = () => {
    sendMsg(message);
    toast.success("Message sent!");
  };
  return (
    <>
      <h1>Chat</h1>
          <input type="text" id="message" name="message"
          onChange={(e) => setMessage(e.target.value)}></input>
      <button onClick={handleSend} >
        Send
      </button>
    </>
  );
};

export default Chat;
