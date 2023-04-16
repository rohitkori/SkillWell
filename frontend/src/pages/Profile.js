import { React, useState, useEffect, useContext } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { IconContext } from "react-icons";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTwitterSquare,
  FaDiscord,
  FaReact,
  FaPhotoVideo,
  FaPaintBrush,
  FaFigma,
  FaChalkboard,
} from "react-icons/fa";
// import "./Dashboard.css";
import AuthContext from "../contexts/AuthContext";
import useAxios from "../utils/useAxios";
import { MdOutlineSwitchVideo } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";
import { SiFlutter } from "react-icons/si";
import toast from "react-hot-toast";

const Profile = () => {
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
    const { user,logoutUser } = useContext(AuthContext);
    const api = useAxios();  
    const [userData, setUserData] = useState({});
    const [imagePreview, setImagePreview] = useState("")  
    const [jobs, setJobs] = useState([])
    const imageLoadURL = 'http://localhost:8000';
    const [searchParams, setSearchParams] = useSearchParams();
    
    const navigate = useNavigate();
    const id = searchParams.get("id");
    
    useEffect(() => {
        const fetchUser = async () => {
            const response = await api.get("/users/");
            if (response.status === 200) {
                const data = response.data;
                const profileUser = data.filter((user) => user.id == id);
                setUserData(profileUser[0]);
                  setImagePreview(`${imageLoadURL}` + profileUser[0].profile_photo);
                  console.log(`${imageLoadURL}` + profileUser[0].profile_photo)
                console.log(profileUser[0]);
                console.log(typeof(id),  id)
            } else {
                console.log("Error");
            }
        };
        fetchUser();
    
        const getJobs = async () => {
          setJobs([]);
          const response = await api.post("/myjobs/", {recruiter: id});
          try {
            if (response.status === 200) {
              console.log(response.data);
              setJobs(response.data)
            } else {
              console.log('No Jobs Found');
              setJobs([]);
            }
          } catch {
            console.log('No Jobs Found');
            setJobs([]);
          }
        };
        getJobs();
    
        console.log(userData);
        console.log(user);
    }, []);
    
    const FreelancerUser = () => {
        return (
          <div className="dashboard-freelancer">
            <div className="dashboard-freelancerTop">
              <div className="freelancer-skill">
                <div className="freelancer-icon">
                  <FaReact size="50" />
                </div>
                <div className="freelancer-skillName">Web Developer</div>
              </div>
              <div className="freelancer-skill">
                <div className="freelancer-icon">
                  <FaPhotoVideo size="50" />
                </div>
                <div className="freelancer-skillName">Video Editor</div>
              </div>
              <div className="freelancer-skill">
                <div className="freelancer-icon">
                  <FaPaintBrush size="50" />
                </div>
                <div className="freelancer-skillName">Digital Designer</div>
              </div>
            </div>
          </div>
        )
      }
    
      const RecruiterUser = () => {
        return (
          <div className="dashboard-recruiter">
            {/* <h1>JOBS</h1> */}
            <div className="dashboard-recruiter-cards">
              {jobs.map((job, index) => {
                return (
                  <div className="dashboard-jobsCard-link">
                    <div className="dashboard-jobsCard" key={job.id}>
                      <div className="dashboard-jobsCard-Title">
                        <div className="dashboard-jobsCard-Top">
                          {icons.map((icons, index) => {
                            return icons.name === job.category ? icons.icon : "";
                          })}
                        </div>
                      </div>
                      <div className="dashboard-jobsCard-Description">
                        <div className="dashboard-jobsCard-Bottom">
                          <div className="dashboard-jobsCard-title">
                            <h1>{job.category}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                );
              })}
            </div>
          </div>
        )
      }
    
    
      return (
        <div className="dashboard-container">
          <div>
            <div className="dashboard-title">
              <div className="dashboard-titleLeft">
                <p>
                  Contact : <span>{userData.contact}</span>
                </p>
                <p>
                  Email Address : <span>{userData.email}</span>
                </p>
                <p>
                  Course Register : <span>{userData.course_enrolled}</span>
                </p>
                <div className="social-media">
                  <a href="https://www.facebook.com/" target="_blank">
                    <FaFacebookSquare size={30} />
                  </a>
                  <a href="https://www.linkedin.com/" target="_blank">
                    <IconContext.Provider
                      value={{ color: "blue", className: "global-class-name" }}
                    >
                      <FaLinkedin size={30} />
                    </IconContext.Provider>
                  </a>
                  <a href="https://www.twitter.com/" target="_blank">
                    <FaTwitterSquare size={30} />
                  </a>
                  <a href="https://www.instagram.com/" target="_blank">
                    <FaInstagram size={30} />
                  </a>
                  <a href="https://www.discord.com/" target="_blank">
                    <IconContext.Provider
                      value={{ color: "blue", className: "global-class-name" }}
                    >
                      <FaDiscord size={30} />
                    </IconContext.Provider>
                  </a>
                </div>
              </div>
              <div className="dashboard-titleRight">
                <div className="dashboard-img">
                  <label>
                    <img
                      src={imagePreview}
                      alt=""
                    />
                  </label>
                </div>
                <div className="dashboard-intro">
                  <h1>
                    {userData.first_name} {userData.last_name}
                  </h1>
                  <p>Username: {userData.username}</p>
                  
                </div>
              </div>
            </div>
            <hr />
            <FreelancerUser/>
            <hr/>
            <RecruiterUser/>
          </div>
        </div>
      );

}

export default Profile;