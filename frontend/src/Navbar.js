import React from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
// import logo from "../src/assets/logo/logo.png";
import "./Navbar.css";

const Navbar = () => {
  function showNavbar() {
    var x = document.getElementById("nav-btnId");
    // console.log(x);
    if (x.className === "nav-btn") {
      x.className += " responsive";
    } else {
      x.className = "nav-btn";
    }
  }

  return (
    <>
      <div className="navbar-container">
        <div className="nav" id="navbar">
          <div className="nav-btn" id="nav-btnId" onClick={showNavbar}>
            <FiMenu />
          </div>
          <div className="nav-left">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="nav-logo">
                {/* <img src={logo} alt="" /> */}
                SKILL WELL
              </div>
            </Link>
            <div className="nav-links" onClick={showNavbar}>
              <ul>
                <Link to="/jobs" style={{ textDecoration: "none" }}>
                  <li>Jobs</li>
                </Link>
                <Link to="/talent" style={{ textDecoration: "none" }}>
                  <li>Freelancer</li>
                </Link>
                <Link to="/jobs/signup" style={{ textDecoration: "none" }}>
                  <li>Post a Work</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="nav-right">
            <div className="nav-links" onClick={showNavbar}>
              <ul>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <li>Login</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;