import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAxios from "../utils/useAxios";
import AuthContext from "../contexts/AuthContext";
import toast from "react-hot-toast";
import {
  FaChevronRight,
  FaClock,
  FaRupeeSign,
  FaUserAlt,
} from "react-icons/fa";
import "./applicants.css";

const Applicants = () => {
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const [applicantData, setApplicantData] = useState([]);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state.id

  useEffect(() => {
    const getApplicant = async () => {
      try {
        const response = await api.get(`/applicant/proposal/`);
        setApplicantData(response.data.filter ((data) => data.job === jobId));
        console.log(response.data.filter((data) => data.job === jobId))
        setCheck(true)
      } catch (error) {
        console.log(error);
      }
    };
    getApplicant();
    console.log(applicantData)
  }, [check]);

  return (
    <div className="applicant-container">
      <div>
        <div className="applicant-title" id="applicant-titleId">
          <h1 className="applicant-title-h1">applicant</h1>
        </div>
        <div className="applicantCard-container" id='applicantCard-containerId'>
        {applicantData.map((applicant, index) => {
          return (
            <div className="applicantCard" key={index} onClick= {() => navigate('/profile?id='+ applicant.freelancer  ) }>
              <div className="applicantCard-left">
                <FaUserAlt size={25} />
                <div className="applicantCard-detail">
                  <p className="applicantCard-name">{applicant.freelancer_name}</p>
                  {/* <p className="applicantCard-skill">{applicant.applicantTitle}</p> */}
                </div>
              </div>
              <div className="applicantCard-right">
                <FaChevronRight />
              </div>
            </div>
          );
          })}
        </div>
        </div>
      </div>
  )
};

export default Applicants;
