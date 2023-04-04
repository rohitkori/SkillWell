import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EditProfile.css";
import useAxios from "../utils/useAxios";
import AuthContext from "../contexts/AuthContext";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await api.get("/users/me/");
      if (response.status === 200) {
        setUserData(response.data);
        console.log(response.data);
      } else {
        console.log("Error");
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    // console.log(e.target.username.value);
    const response = await api.patch("/users/me/", userData);
    if (response.status === 200) {
      console.log("Success");
    } else {
      console.log("Error");
    }
  };

  return (
    <div className="signup-mainContainer">
      <div className="signup-container">
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
                value={userData.username}
                defatultValue={userData.username}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    username: e.target.value,
                  }))
                }
                required
              />
            </label>
            <label>
              Email Address:
              <input type="text" name="email" value={userData.email} required />
            </label>
            <label>
              Contact:
              <input
                type="text"
                name="contact"
                pattern="[1-9]{1}[0-9]{9}"
                defaultValue={userData.contact}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    contact: e.target.value,
                  }))
                }
                required
              />
            </label>
            {/* <label>
                  Password:
                  <input type="password" name="password" required />
                </label>
                <label>
                  Confirm Password:
                  <input type="password" name="confirm_password" required />
                </label> */}
            <label>
              First Name:
              <input
                type="text"
                name="first name"
                defaultValue={userData.first_name}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    first_name: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="last name"
                defaultValue={userData.last_name}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    last_name: e.target.value,
                  }))
                }
              />
            </label>
            {/* <label>
              Gender:
              <select name="gender" defaultValue={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Notsay" selected>
                  Notsay
                </option>
                <option value="Other">Other</option>
              </select>
            </label> */}
            <label>
              Roll Number:
              <input
                type="text"
                name="roll number"
                defaultValue={userData.roll_no}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    roll_no: e.target.value,
                  }))
                }
              />
            </label>
            {/* <label>
              Course Enrolled:
              <select
                name="courses"
                defaultChecked={userData.course_enrolled}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    course_enrolled: e.target.value,
                  }))
                }
              >
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
            <label>
              Profile Photo
              <input
                type="file"
                name="profile photo"
                defaultValue={userData.profile_photo}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    profile_photo: e.target.files[0],
                  }))
                }
                accept="image/*"
              />
            </label>
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
            <div className="signup-submit">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
