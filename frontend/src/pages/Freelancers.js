import { React, useState, useEffect, useContext, useDeferredValue } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";
import {
    FaChevronRight,
    FaClock,
    FaRupeeSign,
    FaUserAlt,
  } from "react-icons/fa";
import "./Freelancers.css";

const People = () => {
    const [people, setPeople] = useState([]);
    const backendURL = API_BASE_URL;
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch(backendURL + '/users/')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPeople(data);
            })
            .catch(err => console.log(err));
    }, []);

  return (
      <>
        <div className="people-container">
          <div>
            <div className="people-title" id="people-titleId">
              <h1 className="people-title-h1">Freelancers</h1>
            </div>
            <div className="peopleCard-container" id='peopleCard-containerId'>
            {people.filter((user) => user.isFreelancer === true)
              .map((user, index) => {
              return (
                <div className="peopleCard" key={index} onClick={() => navigate('/profile?id=' + user.id)}>
                  <div className="peopleCard-left">
                    {user.profile_photo ? (<img src={"http://localhost:8000" + user.profile_photo} alt="" />)
                        : (<FaUserAlt size={25} />)}
                    <div className="peopleCard-detail">
                      <p className="peopleCard-name">{user.first_name + " " + user.last_name}</p>
                    </div>
                  </div>
                  <div className="peopleCard-right">
                    <FaChevronRight />
                  </div>
                </div>
              
              );
              })}
            </div>
            </div>
      </div>
      </>
      )
}

export default People;
