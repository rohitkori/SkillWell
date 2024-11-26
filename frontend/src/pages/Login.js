import React from "react";
import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import AuthContext from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../Spinner";
import { client_secret, client_id, redirect_url } from "../config";

const generateRandomString = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const SSO_LOGIN_CLIENT_URL = "http://localhost:5173/landing";
const RESPONSE_TYPE = "code";
const SCOPE = "openid profile email";
const STATE = generateRandomString(16);

const Login = () => {
  const { loginUser, logoutUser} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
   
    const myPromise = new Promise((resolve, reject) => {
                  setLoading(true);
        loginUser(email, password)
        .catch((err)=>{
          reject(err)
        })
        setLoading(false);
      
          
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

const handleSSOLogin = () => {
  window.location.href = `${SSO_LOGIN_CLIENT_URL}?client_id=${client_id}&redirect_url=${redirect_url}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&state=${STATE}`;
};

  return (
    <div className="login-mainContainer">
    {loading?<Spinner/>:""}
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
          <input
            type="submit"
            className="form-submit"
            onClick={handleSSOLogin}
            value="SSO Login"
          />
        <div className="login-notMemeber">
          <h1>Not a member?</h1>
          <div className="login-notMemberLink">
            <Link to="/signup" style={{ color: "#fff" }}>
              I want a work
            </Link>
            <p> | </p>
            <Link to="/signup" style={{ color: "#fff" }}>
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
