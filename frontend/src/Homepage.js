import { useContext, React } from "react";
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
import RightImg from "./assets/undraw_taken_re_yn20.svg";
import "./Homepage.css";
import AuthContext from "./contexts/AuthContext";

const Homepage = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="homepage-container">
      <div className="homepageTop" id="homepageTopId">
        <div className="homepage-left">
          <h1 className="homepageTitle">Find prime Skills in Campus</h1>
          <p className="homepageDescription">
            The best creative talent on campus is just a click away with our
            platform. Connect with top students and start collaborating on your
            next big project today.
            <br />
            <br /> No more looking for chances. No more wasting of talent.
          </p>
          <div className="homepageButton">
            <Link to="/login">
              <button className="homepageButton-talent">Freelancer</button>
            </Link>
            <Link to="/login">
              <button className="homepageButton-job">Post a Work</button>
            </Link>
          </div>
        </div>
        <div className="homepage-right">
          <img src={RightImg} alt="" />
        </div>
      </div>
      {/* <hr /> */}
      {/* <div className="homepageBottom" id="homepageBottomId">
        <div className="homepageJobs">
          <h2 className="homepageJobsTitle">Featured Works</h2>
          <div className="homepageJobs-container">
            <Link
              to="/jobsDetail"
              className="jobsCard-link"
              style={{ textDecoration: "none" }}
            >
              <div className="homepageJobsCard">
                <div className="homepageCard-Title">
                  <div className="homepageJobsCardLeft-Top">
                    <MdOutlineMovieFilter size={35} />
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
            <Link
              to="/jobsDetail"
              className="jobsCard-link"
              style={{ textDecoration: "none" }}
            >
              <div className="homepageJobsCard">
                <div className="homepageCard-Title">
                  <div className="homepageJobsCardLeft-Top">
                    <MdOutlineSwitchVideo size={35} />
                    <p>Web Developer</p>
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
            <Link
              to="/jobsDetail"
              className="jobsCard-link"
              style={{ textDecoration: "none" }}
            >
              <div className="homepageJobsCard">
                <div className="homepageCard-Title">
                  <div className="homepageJobsCardLeft-Top">
                    <MdOutlinePalette size={35} />
                    <p>Digital Designer</p>
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
      </div> */}
    </div>
  );
};

export default Homepage;
