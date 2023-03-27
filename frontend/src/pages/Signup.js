import React from 'react';
import "./Signup.css";

const Signup = () => {

  window.addEventListener("load", function () {
      const recruiterCheckbox = document.querySelector("#recruiter-checkbox");
      const freelancerCheckbox = document.querySelector("#freelancer-checkbox");
      const recruiterDiv = document.querySelector("#recruiter-form");
      const freelancerDiv = document.querySelector("#freelacer-form");
      console.log(recruiterCheckbox);
      console.log(freelancerCheckbox);
      recruiterCheckbox.addEventListener("change", function () {
        if (recruiterCheckbox.checked) {
          recruiterDiv.style.display = "inline";
        } else {
          recruiterDiv.style.display = "none";
        }
      });
      freelancerCheckbox.addEventListener("change", function () {
        if (freelancerCheckbox.checked) {
          freelancerDiv.style.display = "inline";
        } else {
          freelancerDiv.style.display = "none";
        }
      });
    });

  return (
    <div className="signup-mainContainer">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-form">
          <form>
            <label>
              Username*:
              <input type="text" name="username" required />
            </label>
            <label>
              Email Address*:
              <input type="text" name="email" required />
            </label>
            <label>
              First Name:
              <input type="text" name="first name" />
            </label>
            <label>
              Last Name:
              <input type="text" name="last name" />
            </label>
            <label>
              Gender:
              <select name="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Notsay" selected>
                  Notsay
                </option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Contact:
              <input type="text" name="contact" pattern="[1-9]{1}[0-9]{9}" />
            </label>
            <label>
              Roll Number:
              <input type="text" name="roll number" />
            </label>
            <label>
              Course Enrolled:
              <select name="courses">
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MBA">MBA</option>
                <option value="PHD">PHD</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
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
            </label>
            <label>
              Profile Photo
              <input type="file" name="profile photo" accept="image/*" />
            </label>
            <label>
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
            </label>
            <div id="freelacer-form">
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
            </div>
            <div id="recruiter-form">
              <label>
                About Me:
                <textarea name="about me" />
              </label>
            </div>
            <div className='signup-submit'>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup