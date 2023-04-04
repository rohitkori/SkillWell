import React from "react";
import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import AuthContext from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const { loginUser, logoutUser} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
   
    const myPromise = new Promise((resolve, reject) => {
                  
        loginUser(email, password)
        
            .catch((err)=>{
                reject(err)
            })
          
          
    })                    
    
    toast.promise(myPromise,
        {
            pending: 'Logging you in...',
            success: 'Logged in successfully!',
            error: {
                render: ({ data }) => {
                    if (data == "Unauthorized") {
                        return "Invalid Credentials!"
                    }
                    return "Something went wrong!"
                }
            },
        }
    )
};


  return (
    <div className="login-mainContainer">
    <div className="login-container">
      <div className="login-formContainer">
        <div className="login-heading">
          <h1 className="">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-email">
            <h1 className="">Email</h1>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="login-password">
            <h1 className="">Password</h1>
            <input type="password" id="password" name="password"></input>
          </div>
          <input
            type="submit"
            className="form-submit"
            // onClick={userCheck}
            value="Login"
          />
        </form>
        <div className="login-notMemeber">
          <h1>Not a member?</h1>
          <div className="login-notMemberLink">
            <Link to="/talent/signup" style={{ color: "#fff" }}>
              I want a work
            </Link>
            <p> | </p>
            <Link to="/jobs/signup" style={{ color: "#fff" }}>
              I want to hire
            </Link>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
      </div>
    </div>
  );
};
export default Login;
