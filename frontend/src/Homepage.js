import { useContext, React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronRight,
  FaClock,
  FaRupeeSign,
  FaUserAlt,
} from "react-icons/fa";
import {
  MdOutlineMovieFilter,
  MdOutlineSwitchVideo,
  MdOutlinePalette,
  MdLocationOn,
} from "react-icons/md";
import RightImg from "./assets/undraw_taken_re_yn20.svg";
import "./Homepage.css";
import AuthContext from "./contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { client_secret, client_id, redirect_url } from "./config";
import axios from "axios";
import { Buffer } from "buffer";


const REDIRECT_URL = redirect_url;
const SSO_URL = "http://localhost:8000";
const CLIENT_ID = client_id;
const CLIENT_SECRET = client_secret;


const Homepage = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  console.log(user);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authCode = queryParams.get("auth_code");
  const [access_token, setAccessToken] = useState(
    localStorage.getItem("access_token") || null
  );

  const handleTokenRequest = async () => {
    const requestData = {
      auth_code: authCode,
      grant_type: "authorization_code",
      redirect_url: REDIRECT_URL,
    };

    try {
      const response = await axios.post(
        `${SSO_URL}/api/token/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization":
              "Basic " +
              new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
          },
          json: true,
        }
      );

      console.log("response.data", response)
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      setAccessToken(access_token)

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      console.log("Token request successful");
      console.log("Access Token: ", access_token);
      console.log("from localStorage: ", localStorage.getItem("access_token"));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserDataRequest = async () => {
    const access_token = localStorage.getItem("access_token");
    try {
      const response = await axios.get(`${SSO_URL}/user/me/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className="homepage-container">
      <div className="homepageTop" id="homepageTopId">
        <div className="homepage-left">
          <h1 className="homepageTitle">Find prime Skills in Campus</h1>
          <p className="homepageDescription">
            The best creative talent on campus is just a click away with our
            platform. Connect with top students and start collaborating on your
            next big project today.
            <br />
            <br /> No more looking for chances. No more wasting of talent.
          </p>
          <div className="homepageButton">
            <Link to="/login">
              <button className="homepageButton-talent">Freelancer</button>
            </Link>
            <Link to="/login">
              <button className="homepageButton-job">Post a Work</button>
            </Link>
            {/* show this button if the url have some query parameters like this http://localhost:3000/?auth_code=daezzv8pc54tilpqmklv&state=n4AvVVFlvgqn9TGx */}

          
            {access_token ? (
                  <button className="homepageButton-job" onClick={handleUserDataRequest}>Request Data</button>
                ) : (
                  <button className="homepageButton-job" onClick={handleTokenRequest}>Request Token</button>
                )
            }

   
          </div>
          <div style={{color: "white"}}>
            {console.log("userData", userData)}
            {userData ? (
              Object.keys(userData).map((key, index) => {
                return (
                  <div key={index}>
                    <p style={{fontSize: "15px"}}>{key}: {userData[key]}</p>
                  </div>
                )
              })
            ) : null}
          </div>
        </div>
        <div className="homepage-right">
          <img src={RightImg} alt="" />
        </div>
      </div>
      {/* <hr /> */}
      {/* <div className="homepageBottom" id="homepageBottomId">
        <div className="homepageJobs">
          <h2 className="homepageJobsTitle">Featured Works</h2>
          <div className="homepageJobs-container">
            <Link
              to="/jobsDetail"
              className="jobsCard-link"
              style={{ textDecoration: "none" }}
            >
              <div className="homepageJobsCard">
                <div className="homepageCard-Title">
                  <div className="homepageJobsCardLeft-Top">
                    <MdOutlineMovieFilter size={35} />
                    <p>Video Editor</p>
                  </div>
                  <div className="homepageJobsCardRight-Top">
                    <FaChevronRight size={20} />
                  </div>
                </div>
                <div className="homepageCard-Description">
                  <div className="homepageJobsCardLeft-Bottom">
                    <div className="homepageJobsCard-timeDiv">
                      <FaClock size={12} />
                      <p className="homepageJobsCard-time">Full-time</p>
                    </div>
                    <div className="homepageJobsCard-locationDiv">
                      <MdLocationOn size={13} />
                      <p className="homepageJobsCard-location">Remote</p>
                    </div>
                    <div className="homepageJobsCard-amountDiv">
                      <FaRupeeSign size={12} />
                      <p className="homepageJobsCard-amount">75,000 - 90,000</p>
                    </div>
                  </div>
                  <div className="homepageJobsCardRight-Bottom"></div>
                </div>
              </div>
            </Link>
            <Link
              to="/jobsDetail"
              className="jobsCard-link"
              style={{ textDecoration: "none" }}
            >
              <div className="homepageJobsCard">
                <div className="homepageCard-Title">
                  <div className="homepageJobsCardLeft-Top">
                    <MdOutlineSwitchVideo size={35} />
                    <p>Web Developer</p>
                  </div>
                  <div className="homepageJobsCardRight-Top">
                    <FaChevronRight size={20} />
                  </div>
                </div>
                <div className="homepageCard-Description">
                  <div className="homepageJobsCardLeft-Bottom">
                    <div className="homepageJobsCard-timeDiv">
                      <FaClock size={12} />
                      <p className="homepageJobsCard-time">Full-time</p>
                    </div>
                    <div className="homepageJobsCard-locationDiv">
                      <MdLocationOn size={13} />
                      <p className="homepageJobsCard-location">Remote</p>
                    </div>
                    <div className="homepageJobsCard-amountDiv">
                      <FaRupeeSign size={12} />
                      <p className="homepageJobsCard-amount">75,000 - 90,000</p>
                    </div>
                  </div>
                  <div className="homepageJobsCardRight-Bottom"></div>
                </div>
              </div>
            </Link>
            <Link
              to="/jobsDetail"
              className="jobsCard-link"
              style={{ textDecoration: "none" }}
            >
              <div className="homepageJobsCard">
                <div className="homepageCard-Title">
                  <div className="homepageJobsCardLeft-Top">
                    <MdOutlinePalette size={35} />
                    <p>Digital Designer</p>
                  </div>
                  <div className="homepageJobsCardRight-Top">
                    <FaChevronRight size={20} />
                  </div>
                </div>
                <div className="homepageCard-Description">
                  <div className="homepageJobsCardLeft-Bottom">
                    <div className="homepageJobsCard-timeDiv">
                      <FaClock size={12} />
                      <p className="homepageJobsCard-time">Full-time</p>
                    </div>
                    <div className="homepageJobsCard-locationDiv">
                      <MdLocationOn size={13} />
                      <p className="homepageJobsCard-location">Remote</p>
                    </div>
                    <div className="homepageJobsCard-amountDiv">
                      <FaRupeeSign size={12} />
                      <p className="homepageJobsCard-amount">75,000 - 90,000</p>
                    </div>
                  </div>
                  <div className="homepageJobsCardRight-Bottom"></div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Homepage;
