import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, IMAGE_URL } from "../config";
import { FaChevronRight, FaUserAlt } from "react-icons/fa";
import "./Recruiters.css";

const Recruiter = () => {
  const [recruiter, setrecruiter] = useState([]);
  const backendURL = API_BASE_URL;
  const imageURL = IMAGE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(backendURL + "/users/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setrecruiter(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="recruiter-container">
      <div>
        <div className="recruiter-title" id="recruiter-titleId">
          <h1 className="recruiter-title-h1">Recruiters</h1>
        </div>
        <div className="recruiterCard-container" id="recruiterCard-containerId">
          {recruiter
            .filter((user) => user.isRecruiter === true)
            .map((user, index) => {
              return (
                <div
                  className="recruiterCard"
                  key={index}
                  onClick={() => navigate("/profile?id=" + user.id)}
                >
                  <div className="recruiterCard-left">
                    {user.profile_photo ? (
                      <img src={imageURL + user.profile_photo} alt="" />
                    ) : (
                      <FaUserAlt size={25} />
                    )}
                    <div className="recruiterCard-detail">
                      <p className="recruiterCard-name">
                        {user.first_name + " " + user.last_name}
                      </p>
                    </div>
                  </div>
                  <div className="recruiterCard-right">
                    <FaChevronRight />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Recruiter;
