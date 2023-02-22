import React from 'react';
import { Link } from "react-router-dom"; 
import {
  FaChevronRight,
  FaClock,
  FaRupeeSign,
  FaUserAlt,
} from "react-icons/fa";
import {
  MdOutlineMovieFilter,
  MdOutlineSwitchVideo,
  MdOutlinePalette,
  MdLocationOn,
} from "react-icons/md";
// import RightImg from "./assets/homepage/homepageTop.jpg"
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="homepageTop" id="homepageTopId">
        <div className="homepage-left">
          <h1 className="homepageTitle">Find prime YouTube Talent</h1>
          <p className="homepageDescription">
            India's largest platform to connect YouTubers with the best-in-class
            Creative Professionals.
            <br />
            <br /> No more looking for talent. No more exploitation of talent.
          </p>
          <div className="homepageButton">
            <Link to="/talent/signup">
              <button className="homepageButton-talent">Join as Talent</button>
            </Link>
            <Link to="/jobs/signup">
              <button className="homepageButton-job">Post a Job</button>
            </Link>
          </div>
        </div>
        {/* <div className="homepage-right">
          <img src={RightImg} alt="" />
        </div> */}
      </div>
      <hr />
      <div className="homepageBottom" id="homepageBottomId">
        <div className="homepageJobs">
          <h2 className="homepageJobsTitle">Featured Jobs</h2>
          <div className="homepageJobs-container">
            <Link to="/jobsDetails" className="jobsCard-link">
              <div className="homepageJobsCard">
                <div className="homepageCard-Title">
                  <div className="homepageJobsCardLeft-Top">
                    <MdOutlineMovieFilter size={35} />
                    <p>YouTube Producer</p>
                  </div>
                  <div className="homepageJobsCardRight-Top">
                    <FaChevronRight size={20} />
                  </div>
                </div>
                <div className="homepageCard-Description">
                  <div className="homepageJobsCardLeft-Bottom">
                    <div className="homepageJobsCard-timeDiv">
                      <FaClock size={12} />
                      <p className="homepageJobsCard-time">Full-time</p>
                    </div>
                    <div className="homepageJobsCard-locationDiv">
                      <MdLocationOn size={13} />
                      <p className="homepageJobsCard-location">Remote</p>
                    </div>
                    <div className="homepageJobsCard-amountDiv">
                      <FaRupeeSign size={12} />
                      <p className="homepageJobsCard-amount">75,000 - 90,000</p>
                    </div>
                  </div>
                  <div className="homepageJobsCardRight-Bottom"></div>
                </div>
              </div>
            </Link>
            <Link to="/jobsDetails" className="jobsCard-link">
              <div className="homepageJobsCard">
                <div className="homepageCard-Title">
                  <div className="homepageJobsCardLeft-Top">
                    <MdOutlineSwitchVideo size={35} />
                    <p>Video Editor</p>
                  </div>
                  <div className="homepageJobsCardRight-Top">
                    <FaChevronRight size={20} />
                  </div>
                </div>
                <div className="homepageCard-Description">
                  <div className="homepageJobsCardLeft-Bottom">
                    <div className="homepageJobsCard-timeDiv">
                      <FaClock size={12} />
                      <p className="homepageJobsCard-time">Full-time</p>
                    </div>
                    <div className="homepageJobsCard-locationDiv">
                      <MdLocationOn size={13} />
                      <p className="homepageJobsCard-location">Remote</p>
                    </div>
                    <div className="homepageJobsCard-amountDiv">
                      <FaRupeeSign size={12} />
                      <p className="homepageJobsCard-amount">75,000 - 90,000</p>
                    </div>
                  </div>
                  <div className="homepageJobsCardRight-Bottom"></div>
                </div>
              </div>
            </Link>
            <Link to="/jobsDetails" className="jobsCard-link">
              <div className="homepageJobsCard">
                <div className="homepageCard-Title">
                  <div className="homepageJobsCardLeft-Top">
                    <MdOutlinePalette size={35} />
                    <p>Thumbnail Designer</p>
                  </div>
                  <div className="homepageJobsCardRight-Top">
                    <FaChevronRight size={20} />
                  </div>
                </div>
                <div className="homepageCard-Description">
                  <div className="homepageJobsCardLeft-Bottom">
                    <div className="homepageJobsCard-timeDiv">
                      <FaClock size={12} />
                      <p className="homepageJobsCard-time">Full-time</p>
                    </div>
                    <div className="homepageJobsCard-locationDiv">
                      <MdLocationOn size={13} />
                      <p className="homepageJobsCard-location">Remote</p>
                    </div>
                    <div className="homepageJobsCard-amountDiv">
                      <FaRupeeSign size={12} />
                      <p className="homepageJobsCard-amount">75,000 - 90,000</p>
                    </div>
                  </div>
                  <div className="homepageJobsCardRight-Bottom"></div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="homepageTalent">
          <h2 className="homepageTalentTitle">Featured Talent</h2>
          <div className="homepageTalent-container">
            <div className="homepageTalentCard">
              <div className="homepageTalent-left">
                <FaUserAlt size={25} />
                <div className="homepageTalent-detail">
                  <p className="homepageTalent-name">Yuvraj Rathva</p>
                  <p className="homepageTalent-skill">Video Editor</p>
                </div>
              </div>
              <div className="homepageTalent-right">
                <FaChevronRight />
              </div>
            </div>
            <div className="homepageTalentCard">
              <div className="homepageTalent-left">
                <FaUserAlt size={25} />
                <div className="homepageTalent-detail">
                  <p className="homepageTalent-name">Rishav Aich</p>
                  <p className="homepageTalent-skill">Digital Design</p>
                </div>
              </div>
              <div className="homepageTalent-right">
                <FaChevronRight />
              </div>
            </div>
            <div className="homepageTalentCard">
              <div className="homepageTalent-left">
                <FaUserAlt size={25} />
                <div className="homepageTalent-detail">
                  <p className="homepageTalent-name">Rohit Kumar Kori</p>
                  <p className="homepageTalent-skill">Web Developer</p>
                </div>
              </div>
              <div className="homepageTalent-right">
                <FaChevronRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;