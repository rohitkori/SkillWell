import { React, useState, useEffect, useContext } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { IconContext } from "react-icons";

import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTwitterSquare,
  FaDiscord,
  FaReact,
  FaPhotoVideo,
  FaPaintBrush,
} from "react-icons/fa";
import "./Dashboard.css";
import AuthContext from "./contexts/AuthContext";
import useAxios from "./utils/useAxios";
import Button from '@mui/material/Button';

import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
// import { backendURL, imageLoadURL } from "../backendURL";

const Dashboard = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const api = useAxios();  
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await api.get("/users/me/");
      setUserData(data);
      console.log(data);
    };
    fetchUser();
    console.log(userData);
  }, []);
  
  return (
    <div className="dashboard-container">
      <div>
        <div className="dashboard-title">
          <div className="dashboard-titleLeft">
            <p>
              Contact : <span>{userData.contact}</span>
            </p>
            <p>
              Email Address : <span>{userData.email}</span>
            </p>
            <p>
              Course Register : <span>{ userData.course_enrolled}</span>
            </p>
            <div className="social-media">
              <a href="https://www.facebook.com/" target="_blank">
                <FaFacebookSquare size={30} />
              </a>
              <a href="https://www.linkedin.com/" target="_blank">
                <IconContext.Provider
                  value={{ color: "blue", className: "global-class-name" }}
                >
                  <FaLinkedin size={30} />
                </IconContext.Provider>
              </a>
              <a href="https://www.twitter.com/" target="_blank">
                <FaTwitterSquare size={30} />
              </a>
              <a href="https://www.instagram.com/" target="_blank">
                <FaInstagram size={30} />
              </a>
              <a href="https://www.discord.com/" target="_blank">
                <IconContext.Provider
                  value={{ color: "blue", className: "global-class-name" }}
                >
                  <FaDiscord size={30} />
                </IconContext.Provider>
              </a>
            </div>
          </div>
          <div className="dashboard-titleRight">
            <div className="dashboard-img">
              <label>
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                  alt=""
                />
                {userData.profile_pic}
              </label>
            </div>
            <div className="dashboard-intro">
              <h1>
                {userData.first_name} {userData.last_name}
                {/* Alex Hipp */}
              </h1>
              <p>{ userData.username}</p>
              {/* <p>alexanderhipp2003</p> */}
            </div>
          </div>
        </div>
        <hr />
        <div className="dashboard-freelancer">
          <div className="dashboard-freelancerTop">
            <div className="freelancer-skill">
              <div className="freelancer-icon">
                <FaReact size="50" />
              </div>
              <div className="freelancer-skillName">Web Developer</div>
            </div>
            <div className="freelancer-skill">
              <div className="freelancer-icon">
                <FaPhotoVideo size="50" />
              </div>
              <div className="freelancer-skillName">Video Editor</div>
            </div>
            <div className="freelancer-skill">
              <div className="freelancer-icon">
                <FaPaintBrush size="50" />
              </div>
              <div className="freelancer-skillName">Digital Designer</div>
            </div>
          </div>
        </div>
        <div className="dashboard-recruiter">      
        </div>
        <div className="user-logout" onClick={logoutUser}>
        <Button disabled={false} variant="elevated" >
            LOGOUT
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
