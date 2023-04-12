import React, { useState, useContext } from "react";
import {
  FaClock,
  FaRupeeSign,
  FaRegCalendar,
} from "react-icons/fa";
import {
  MdOutlineMovieFilter,
  MdLocationOn,
} from "react-icons/md";
import "./JobsDetail.css";
import { useLocation } from "react-router-dom";
import JobsInfo from "./JobsInfo";
import { useEffect } from "react";
import useAxios from "../utils/useAxios";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { API_BASE_URL } from "../config";
import { toast } from "react-hot-toast";

const JobsDetail = () => {
  const [job, setJob] = useState({});
  const location = useLocation();
  const id = location.state.id;
  const api = useAxios();
  const Backend_URL = API_BASE_URL;
  const [date, setDate] = useState("");
  const { user } = useContext(AuthContext);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    console.log(id);
    const fetchJobDetail = async () => {
      const response = await axios.post(Backend_URL + '/alljobs/', { id: id });
      if (response.status === 200) {
        setJob(response.data)
        setDate(response.data.created_at.slice(0,10))
        console.log(response.data);
      } else {
        console.log('error');
      }
    }
    fetchJobDetail();

    const checkApplication = async  () => {
      const response = await api.post('/checkapplication/', { job: id, freelancer: user.user_id });
      if (response.status === 200) {
        setShowButton(false);
      }   
    }
    checkApplication();
      
  }, []);

  const handleApply = async () => {
    const data = {
      job: job.id,
      freelancer : user.user_id,
    }
    const response = await api.post("/applicant/", data);
    if (response.status === 201) {
      console.log('Applied');
      toast.success('Applied successfully');
    } else {
      console.log('error');
      toast.error('Error in applying')
    }
  };

  return (
    <div className="jobsDetail-container">
      <div>
        <div className="jobDetail-top">
          <div className="jobDetail-title">
            <div className="jobDetail-titleLeft">
              <MdOutlineMovieFilter size={45} />
              <p>{job.category}</p>
            </div>
            <div className="jobDetail-titleRight">
              <div className="jobDetail-img">
                <label>
                  <img
                    id=""
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt=""
                  />
                </label>
              </div>
              <div className="jobDetail-info">
                <h1>
                {job.recruiter_name}
                </h1>
                <p>
                  {job.recruiter_rollno}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="jobDetail-details">
            <div className="jobDetail-1">
              <FaRupeeSign size={15} />
              <p className="jobsCard-amount">3,000 Per Project</p>
            </div>
            <div className="jobDetail-1">
              <FaClock size={15} />
              <p className="jobsCard-time">Part Time</p>
            </div>
            <div className="jobDetail-1">
              <MdLocationOn size={15} />
              <p className="jobsCard-location">Remote</p>
            </div>
            <div className="jobDetail-1">
              <FaRegCalendar />
              <p className="jobsCard-start">ASAP</p>
            </div>
          </div> */}
          {/* <p className="error-line">{error}</p> */}
          {showButton ? (
                <div className="jobDetail-button" onClick={handleApply}>
                  <button className="">Easy Apply</button>
                </div>): (
                <div className="jobDetail-button">
                  <button className="">Already Applied</button>
                </div>)}
        </div>
        <hr />
        <div className="jobDetail-bottom">
          <div className="jobDetail-about">
            <h4 className="jobDetail-aboutTitle">About the job</h4>
            <p className="jobDetail-aboutDescription">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
              eius quos ea repellendus magnam nesciunt placeat nisi asperiores?
              Iure quisquam cupiditate veniam esse sed nihil eum earum dicta
              similique porro!
            </p>
          </div>
          <div className="jobDetail-idealCandidate">
            <h4 className="jobDetail-idealCandidateTitle">Ideal candidate</h4>
            <p className="jobDetail-idealCandidateDescription">
              My ideal candidate for this position must have a strong work
              ethic, assisting me in producing content daily while meeting
              strict deadlines. Effective communication skills are also
              essential! Most importantly, you need to be passionate, motivated,
              and dedicated to creating the best Minecraft videos for our
              audience on YouTube!
            </p>
          </div>
          <div className="jobDetail-requirements">
            <h4 className="jobDetail-requirementsTitle jobDetail-requirementsDescription dashed">
              Job requirements
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam sint
              totam ipsam quaerat facere aspernatur commodi culpa voluptas, iste
              enim earum quod vitae corrupti, impedit, in repellendus tempora
              natus. Odit!
            </p>
          </div>
          <div className="jobPosted">
            <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsDetail;
