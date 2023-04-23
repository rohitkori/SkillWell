import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./EditProfile.css";
import useAxios from "../utils/useAxios";
import AuthContext from "../contexts/AuthContext";
import toast from "react-hot-toast";
import "./chat.css";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const navigate = useNavigate();
  const { loginUser, logoutUser} = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [sendChat, setSendChat] = useState([]);
  const [receiveChat, setReceiveChat] = useState([]);
  const location = useLocation();
  

  useEffect(() => {
    const getSendChat = async () => {
      try {
        const response = await api.post("/getsendchat/", {sender: user.user_id, receiver: location.state.receiver});
        console.log(response.data);
        setSendChat(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    const getReceiveChat = async () => {
      try {
        const response = await api.post("/getreceivechat/", { sender: location.state.receiver, receiver: user.user_id });
        console.log(response.data);
        setReceiveChat(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(sendChat)
  
    getSendChat();
    getReceiveChat();
    // const msg = getAllChat();
    // console.log(msg)

    
  }, [message]);

  const getAllChat = async () => {
    const messages = [];
    console.log(sendChat.length, receiveChat.length)

    for (let i = 0; i < sendChat.length;) {
      for (let j = 0; j < receiveChat.length;) {
        if (sendChat[i].id < receiveChat[j].id) {
          messages.push(sendChat[i]);
          console.log(i, "I")
          i++;
          break;
        } else {
          messages.push(receiveChat[j]);
          console.log(j, "J");
          j++;
          continue;
        }
      }
    }
    return messages;
  }

  const allChats = () => {
    const messages = [];
    console.log(sendChat.length, receiveChat.length)
    return (<h1>hello</h1>)
    // for (let i = 0; i < sendChat.length;) {
    //   for (let j = 0; j < receiveChat.length;) {
    //     if (sendChat[i].id < receiveChat[j].id) {
    //       messages.push(sendChat[i]);
    //       console.log(i, "I")
    //       i++;
    //       break;
    //     } else {
    //       messages.push(receiveChat[j]);
    //       console.log(j, "J");
    //       j++;
    //       continue;
    //     }
    //   }
    // }
    // console.log(messages)
    // messages.map((item) => {
    //   return (
    //     <div className="chat-heading">
    //       <div className="chat-heading">
    //         <h1>{item.id}</h1>
    //       </div>
    //       <div className="chat-heading">
    //         <p>{item.message}</p>
    //       </div>
    //     </div>
    //   )
    //   })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      sender: user.user_id,
      receiver: location.state.receiver,
      message: message,
    }
    try {
      const response = await api.post("/chat/", data);
      if (response.status === 201) {
        toast.success("Message sent");
        setMessage("");
      } else {
        toast.error("Message not sent");
      }
    } catch (error) {
      console.log(error);
    }   
    }

    return (
        <div className="chat-mainContainer">
        {/* {loading?<Spinner/>:""} */}
        
        <div className="chat-heading">
          {sendChat || receiveChat ? allChats() : <h1>no chats</h1>}
        {/* {
              sendChat.map((item) => {
                receiveChat.map((item1) => {
                  // if (item._id > item1._id) {
                    return (
                      <div className="chat-heading">
                        <div className="chat-heading">
                          <h1>{item1.id}</h1>
                        </div>
                        <div className="chat-heading">
                          <p>{item1.message}</p>
                        </div>
                      </div>
                    )
                  // } else {
                  //   return (
                  //     <div className="chat-messageContainer">
                  //       <div className="chat-message">
                  //         <p>{item.id}</p>
                  //       </div>
                  //       <div className="chat-message">
                  //         <p>{item.message}</p>
                  //       </div>
                  //     </div>
                  //   )
                  // }
                })
              })
          }; */}
        </div>
        <div className="chat-container">
          <div className="chat-formContainer">
            <div className="chat-heading">
              <h1 className="">chat</h1>
            </div>
            <form onSubmit={handleSubmit} className="chat-form">
              <div className="chat-email">
                <h1 className="">Message</h1>
                <input
                  type="text"
                  id="message"
                  name="message"
                  placeholder="e.g.message"
                  onChange={(e) => setMessage(e.target.value)}
                ></input>
              </div>
              {/* <div className="chat-password">
                <h1 className="">Password</h1>
                <input type="password" id="password" name="password"></input>
              </div>
              <input
                type="submit"
                className="form-submit"
                // onClick={userCheck}
                value="chat"
              /> */}
            </form>
          
            {/* <div className="chat-notMemeber">
              <h1>Not a member?</h1>
              <div className="chat-notMemberLink">
                <Link to="/signup" style={{ color: "#fff" }}>
                  I want a work
                </Link>
                <p> | </p>
                <Link to="/signup" style={{ color: "#fff" }}>
                  I want to hire
                </Link>
              </div>
            </div> */}
          </div>
          {/* <ToastContainer /> */}
          </div>
        </div>
      );


}

export default Chat;