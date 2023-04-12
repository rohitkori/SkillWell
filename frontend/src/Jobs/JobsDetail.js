import React, { useState, useContext } from "react";
import { FaReact, FaPaintBrush, FaFigma, FaChalkboard } from "react-icons/fa";
import { MdOutlineSearch, MdOutlineSwitchVideo } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";
import { SiFlutter } from "react-icons/si";
import "./JobsDetail.css";
import { useLocation,Link } from "react-router-dom";
import { useEffect } from "react";
import useAxios from "../utils/useAxios";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { API_BASE_URL } from "../config";
import { toast } from "react-hot-toast";
const icons = [
  {
    id: 0,
    name: "Web Development",
    icon: <FaReact size={100} />,
  },
  {
    id: 1,
    name: "Video Editing",
    icon: <MdOutlineSwitchVideo size={100} />,
  },
  {
    id: 2,
    name: "App Development",
    icon: <SiFlutter size={100} />,
  },
  {
    id: 3,
    name: "Machine Learning",
    icon: <GiArtificialIntelligence size={100} />,
  },
  {
    id: 4,
    name: "Poster Design",
    icon: <FaPaintBrush size={100} />,
  },
  {
    id: 5,
    name: "Graphic Design",
    icon: <FaFigma size={100} />,
  },
  {
    id: 6,
    name: "Photography",
    icon: <FaReact size={100} />,
  },
  {
    id: 7,
    name: "Other",
    icon: <FaChalkboard size={100} />,
  },
];
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
              {icons.map((icon) =>
                icon.name === job.category ? icon.icon : null
              )}
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
                  <h1>{job.recruiter_name}</h1>
                  <p>{job.recruiter_rollno}</p>
                </div>
              </div>
          </div>
          {showButton ? (
            <div className="jobDetail-button" onClick={handleApply}>
              <button className="">Easy Apply</button>
            </div>
          ) : (
            <div className="jobDetail-button">
              <button className="">Already Applied</button>
            </div>
          )}
        </div>
        <hr />
        <div className="jobDetail-bottom">
          <div className="jobDetail-about">
            <h4 className="jobDetail-aboutTitle">About the Work</h4>
            <p className="jobDetail-aboutDescription">
              {job.description ? job.description : null}
            </p>
          </div>
          <div className="jobPosted">
            <p>Opened on: {date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsDetail;
