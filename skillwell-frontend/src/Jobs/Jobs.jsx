import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaReact, FaPaintBrush, FaFigma, FaChalkboard } from "react-icons/fa";
import { MdOutlineSearch, MdOutlineSwitchVideo, MdOutlineMonochromePhotos } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";
import { SiFlutter } from "react-icons/si";
import { CgNotes } from "react-icons/cg";
import jobsInfo from "./JobsInfo.jsx";
import { API_BASE_URL } from "../config";
import axios from "axios";
import "./Jobs.css";
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
    icon: <MdOutlineMonochromePhotos size={100} />,
  },
  {
    id: 7,
    name: "Other",
    icon: <FaChalkboard size={100} />,
  },
];


const Jobs = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getJobs = async () => {
      const { data } = await axios.get(API_BASE_URL+"/alljobs/");
      setJobs(data);
    };
    getJobs();


  }, []);

  const handleClick = (id) => {
    navigate("/jobdetail/", { state: { id: id } })
  }

  return (
    <div className="jobs-container">
      <div className="jobs-title" id="jobs-titleId">
        <h1 className="jobs-title-h1">Works</h1>
        <div className="jobs-search">
          <input
            type="search"
            placeholder="Search here"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <MdOutlineSearch size={20} />
        </div>
      </div>
      <div className="jobsCard-container" id="jobsCard-containerId">
        {jobs
          .filter(
            (job) =>
              job.category.toLowerCase().includes(query.toLowerCase()) ||
              job.recruiter_name.toLowerCase().includes(query.toLowerCase()) ||
              job.recruiter_rollno.toLowerCase().includes(query.toLowerCase())
          )
          .map((job, index) => {
          return (
              <div className="jobsCard" key={job.id} onClick={() => {handleClick(job.id)}}>
                <div className="jobsCard-Title">
                  <div className="jobsCard-Top">
                    {icons.map((icons, index) => {
                        return icons.name === job.category ? icons.icon : "";
                      })}
                  </div>
                </div>
                <div className="jobCard-Description">
                  <div className="jobsCard-Bottom">
                    <div className="jobCard-title">
                      <h1>{job.category}</h1>
                    </div>
                    <div className="jobCard-creator">
                      <p>{job.recruiter_name}</p>
                      <span>{job.recruiter_rollno}</span>
                    </div>
                  </div>
                </div>
              </div>
          );
        })}
      </div>
    </div>
  );
};

export default Jobs;
