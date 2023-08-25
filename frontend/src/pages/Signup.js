import React from "react";
import "./Signup.css";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";

const Signup = () => {
  const { registerUser } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      e.target.email.value,
      e.target.username.value,
      e.target.password.value,
      e.target.confirm_password.value,
      e.target.contact.value
    );
    if (e.target.email.value.split("@")[1] === "iitj.ac.in") {
      registerUser(
        e.target.email.value,
        e.target.username.value,
        e.target.contact.value,
        e.target.password.value,
        e.target.confirm_password.value,
      );
    } else {
      toast.error("Please use your IITJ email address");
    }  
  };

  return (
    <div className="signup-mainContainer">
      <div className="signup-container">
      <div className="signup-formContainer">
        <div className="signup-header">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                // onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Email Address:
              <input
                type="text"
                name="email"
                // onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Contact:
              <input
                type="text"
                name="contact"
                pattern="[1-9]{1}[0-9]{9}"
                required
              />
            </label>
            <label>
              Password:
              <input type="password" name="password" required />
            </label>
            <label>
              Confirm Password:
              <input type="password" name="confirm_password" required />
            </label>
            {/* <label>
              First Name:
              <input type="text" name="first name" />
            </label> */}
            {/* <label>
              Last Name:
              <input type="text" name="last name" />
            </label> */}
            {/* <label>
              Gender:
              <select name="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Notsay" selected>
                  Notsay
                </option>
                <option value="Other">Other</option>
              </select>
            </label> */}
            {/* <label>
              Roll Number:
              <input type="text" name="roll number" />
            </label> */}
            {/* <label>
              Course Enrolled:
              <select name="courses">
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MBA">MBA</option>
                <option value="PHD">PHD</option>
                <option value="Other">Other</option>
              </select>
            </label> */}
            {/* <label>
              Current Year:
              <select name="courses">
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
                <option value="6">Graduated</option>
                <option value="7">Faculty/Staff</option>
                <option value="8">NA</option>
              </select>
            </label> */}
            {/* <label>
              Profile Photo
              <input type="file" name="profile photo" accept="image/*" />
            </label> */}
            {/* <label>
              <input
                type="checkbox"
                // defaultValue="false"
                id="freelancer-checkbox"
                className="freelancer-checkbox"
              />
              Are you a Freelancer?
            </label>
            <label>
              <input
                type="checkbox"
                // defaultValue="false"
                id="recruiter-checkbox"
                className="recruiter-checkbox"
              />
              Are you a Recruiter?
            </label> */}
            {/* <div id="freelacer-form">
              <label>
                Your Skill 1*:
                <input type="text" name="skill1" required />
              </label>
              <label>
                Your Skill 2:
                <input type="text" name="skill2" />
              </label>
              <label>
                Your Skill 3:
                <input type="text" name="skill3" />
              </label>
            </div> */}
            {/* <div id="recruiter-form">
              <label>
                About Me:
                <textarea name="about me" />
              </label>
            </div> */}
            <div className="signup-submit">
              <input type="submit" />
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
