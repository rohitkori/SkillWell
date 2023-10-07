import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EditProfile.css";
import useAxios from "../utils/useAxios";
import AuthContext from "../contexts/AuthContext";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await api.get("/users/me/");
      if (response.status === 200) {
        setUserData(response.data);
        setImage(response.data.profile_photo)
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
    if (image === userData.profile_photo) {
      userData.profile_photo = null;
      console.log("Same image")
    }
    const response = await api.patch("/users/me/", userData);
    if (response.status === 200) {
      console.log("Success");
      toast.success("Profile updated successfully");
      navigate('/dashboard');
    } else {
      console.log("Error");
    }
  };

  return (
    <div className="editProfile-mainContainer">
      <div className="editProfile-container">
        <div className="editProfile-header">
          <h1>Edit Profile</h1>
        </div>
        <div className="editProfile-form">
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
            <label>
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
                <option value="none" selected disabled hidden >Select your course</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MBA">MBA</option>
                <option value="PHD">PHD</option>
                <option value="Other">Other</option>
              </select>
            </label>
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
            <div className="editProfile-submit">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
