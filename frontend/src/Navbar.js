import {React, useContext} from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import logo from "./assets/logo7.png";
import "./Navbar.css";
import  AuthContext  from "./contexts/AuthContext";


const Navbar = () => {
  const { user } = useContext(AuthContext);

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
                <img src={logo} alt="" />
                {/* SKILLWELL */}
              </div>
            </Link>
            <div className="nav-links" onClick={showNavbar}>
              <ul>
                <Link to="/jobs" style={{ textDecoration: "none" }}>
                  <li>Works</li>
                </Link>
                {/* <Link to="/*" style={{ textDecoration: "none" }}>
                  <li>Freelancer</li>
                </Link> */}
                <Link to="/*" style={{ textDecoration: "none" }}>
                  <li>Post a Work</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="nav-right">
            <div className="nav-links" onClick={showNavbar}>
              <ul>
                {user ? (<Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <li>Dashboard</li>
                </Link>):(<Link to="/login" style={{ textDecoration: "none" }}>
                  <li>Login</li>
                </Link>)}            
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;