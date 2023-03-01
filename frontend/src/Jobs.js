import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChevronRight,
  FaClock,
  FaRupeeSign,
  FaVideo,
  FaUserCog,
} from "react-icons/fa";
import {
  MdOutlineMovieFilter,
  MdOutlineSwitchVideo,
  MdOutlinePalette,
  MdOutlineNoteAlt,
  MdLocationOn,
  MdOutlineSearch,
} from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import jobsInfo from "./JobsInfo.js";
import "./Jobs.css";
const icons = [
  {
    id: 0,
    name: "YouTube Producer",
    icon: <MdOutlineMovieFilter size={30} />,
  },
  {
    id: 1,
    name: "Video Editor",
    icon: <MdOutlineSwitchVideo size={30} />,
  },
  {
    id: 2,
    name: "Thumbnail Designer",
    icon: <MdOutlinePalette size={30} />,
  },
  {
    id: 3,
    name: "Creative Director",
    icon: <FaVideo size={30} />,
  },
  {
    id: 4,
    name: "Channel Manager",
    icon: <FaUserCog size={30} />,
  },
  {
    id: 5,
    name: "YouTube Strategist",
    icon: <MdOutlineNoteAlt size={30} />,
  },
  {
    id: 6,
    name: "Script Writer",
    icon: <CgNotes size={30} />,
  },
];

const Jobs = () => {
  const [query, setQuery] = useState("");

  // console.log(jobsInfo.filter(job => job.jobTitle.toLowerCase().includes(query)))
//   const [jobsInfo, setJobsInfo] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [channelSubscriber, setChannelSubscriber] = useState("");
  const [channelName, setChannelName] = useState("");


  return (
    <div className="jobs-container">
      <div className="jobs-title" id="jobs-titleId">
        <h1 className="jobs-title-h1">Jobs</h1>
        <div className="jobs-search">
          <input
            type="search"
            placeholder="Search here"
            // onChange={(e) => setQuery(e.target.value)}
            // value={query}
          />
          <MdOutlineSearch size={20} />
        </div>
      </div>
      <div className="jobsCard-container" id="jobsCard-containerId">
        {jobsInfo
          .map((job, index) => {
            return (
              <Link className="jobsCard-link">
                <div className="jobsCard" key={index}>
                  <div className="jobsCard-Title">
                    <div className="jobsCardLeft-Top">
                      {icons.map((icons, index) => {
                        return icons.name === job.jobTitle ? icons.icon : "";
                      })}
                      {/* {job.jobIcon} */}
                      <p>{job.jobTitle}</p>
                    </div>
                    <div className="jobsCardRight-Top">
                      <FaChevronRight size={20} />
                    </div>
                  </div>
                  <div className="jobCard-Description">
                    <div className="jobsCardLeft-Bottom">
                      <p className="jobsCard-time">
                        <FaClock size={12} /> {job.jobTime}
                      </p>
                      <p className="jobsCard-location">
                        <MdLocationOn size={13} /> {job.jobLocation}
                      </p>
                      <p className="jobsCard-amount">
                        <FaRupeeSign size={12} /> {job.jobAmout}
                      </p>
                    </div>
                    {/* <div className="jobsCardRight-Bottom">
                      <img src={job.recruiter_profile_pic} alt="" />
                      <p>{convertToK(job.recruiter_subscribers)}</p>
                    </div> */}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Jobs;
