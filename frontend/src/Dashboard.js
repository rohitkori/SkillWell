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
import { HiOutlinePencilAlt } from "react-icons/hi";
import "./Dashboard.css";
import AuthContext from "./contexts/AuthContext";
import useAxios from "./utils/useAxios";
import { MdOutlineSwitchVideo } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";
import { SiFlutter } from "react-icons/si";
import Spinner from "./Spinner";
import jobsInfo from "./Jobs/JobsInfo.js";
import toast from "react-hot-toast";

const Dashboard = () => {
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
  const [myjobs, setMyJobs] = useState([])
  const [mySkills, setMySkills] = useState([])
  const [jobDelete, setJobDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  const imageLoadURL = 'http://localhost:8000';
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data } = await api.get("/users/me/");
      setUserData(data);
      setImagePreview(`${imageLoadURL}` + data.profile_photo);
      console.log(`${imageLoadURL}` + data.profile_photo)
      console.log(data);
      setLoading(false);
    };
    fetchUser();

    const getMyJobs = async () => {
      setMyJobs([]);
      const response = await api.post("/myjobs/", {recruiter: user.user_id});
      try {
        if (response.status === 200) {
          console.log(response.data);
          setMyJobs(response.data)
        } else {
          console.log('No Jobs Found');
          setMyJobs([]);
        }
      } catch {
        console.log('No Jobs Found');
        setMyJobs([]);
      }
      
    };
    getMyJobs();

    const getMySkills = async () => {
      setMySkills([]);
      const response = await api.get("/skills/", { freelancer: user.user_id });
      try {
        if (response.status === 200) {
          console.log(response.data);
          setMySkills(response.data);
        } else {
          console.log('No Skills Found');
          setMySkills([]);
        }
      } catch {
        console.log('No Skills Found');
        setMySkills([]);
      }
    };
    getMySkills();

    console.log(userData);
    console.log(user);
  }, [jobDelete]);

  const RecruiterRegister = async () => {
    const response = await api.post("/recruiter/", { about_me: "I am a recruiter" ,is_approved : "False"})
    if (response.status === 200) {
      console.log('Recruiter Registered');
      const resp = await api.patch("/users/me/", { isRecruiter: "True" })
      if (resp.status === 200) {
        console.log('User Updated');
        toast.success('Recruiter Registered');
        logoutUser();
      }
    }
  }

  const FreelancerRegister = async () => {
    const response = await api.post("/freelancer/", { about_me: "I am a freelancer", is_approved: "False" })
    if (response.status === 200) {
      console.log('Freelancer Registered');
      const resp = await api.patch("/users/me/", { isFreelancer: "True" })
      if (resp.status === 200) {
        console.log('User Updated');
        toast.success('Freelancer Registered');
        logoutUser();
      }
    }
  }

  function editSkills() {
    navigate("/edit-skills");
  }

  const FreelancerUser = () => {
    return (
      <div className="dashboard-freelancer">
        <div className="dashboard-freelancerAdd" onClick={editSkills}>
          Edit Skills
        </div>
        <div className="dashboard-freelancerTop">
          {mySkills.length === 0 ? (
            <div className="dashboard-freelancerTop">No Skills Added</div>
          ) : (
            <div className="dashboard-freelancerTop">
              {mySkills.map((skill) => (
                <div className="freelancer-skill">
                  <div className="freelancer-icon">
                    {icons.map((icons, index) => {
                      return icons.name === mySkills.name ? icons.icon : "";
                    })}
                  </div>
                  <div className="freelancer-skillName">{mySkills.name}</div>
                </div>
              ))}
            </div>
          )}
          {/* <div className="freelancer-skill">
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
          </div> */}
        </div>
      </div>
    );
  }

  const RecruiterUser = () => {
    return (
      <div className="dashboard-recruiter">
        {/* <h1>JOBS</h1> */}
        <div className="dashboard-recruiter-cards">
          {myjobs.map((job, index) => {
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
                      <div className="dashboard-jobsCard-creator">
                        <p  onClick={() => navigate('/applicants/',{ state: { id: job.id } } )}>Show participants list</p>
                        <span onClick={() => { deleteJob(job.id) }} >Delete</span>
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

  const deleteJob = async (id) => {
    setLoading(true);
    const response = await api.delete("/job/" + id + "/");
    if (response.status === 204) {
      console.log('Job Deleted');
      toast.success('Job Deleted');
      setJobDelete(!jobDelete);
      navigate('/dashboard')
      setLoading(false);
    } else {
      toast.error('Job Not Deleted');
    }
  };

  const RegisterAsRecruiter = () => {
    return (
      <div className="dashboard-registerAsRecruiter">
        <div className="dashboard-registerAsRecruiter-Title">
          <h1>Register as a Recruiter</h1>
        </div>
        <div className="dashboard-registerAsRecruiter-Description">
          <p>
            Register as a recruiter to post jobs and get access to our
            freelancers.
          </p>
        </div>
        <div className="dashboard-registerAsRecruiter-Button" onClick={RecruiterRegister} >
          <button>Register</button>
        </div>
      </div>
    )
  }

  const RegisterAsFreelancer = () => {
    return (
      <div className="dashboard-registerAsFreelancer">
        <div className="dashboard-registerAsFreelancer-Title">
          <h1>Register as a Freelancer</h1>
        </div>
        <div className="dashboard-registerAsFreelancer-Description">
          <p> 
            Register as a freelancer to get access to our jobs and apply for them.
          </p>
        </div>
        <div className="dashboard-registerAsFreelancer-Button" onClick={FreelancerRegister}>
          <button>Register</button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="dashboard-container">
    {loading ? <Spinner /> : 
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
                <img src={imagePreview} alt="" />
                {/* {userData.profile_pic} */}
              </label>
            </div>
            <div className="dashboard-intro">
              <h1>
                {userData.first_name} {userData.last_name}
                {/* Alex Hipp */}
              </h1>
              <p>Username: {userData.username}</p>
              <div
                onClick={() => {
                  navigate("/editProfile");
                }}
                style={{ cursor: "pointer" }}
              >
                <p style={{ textDecoration: "underline" }}>Edit Profile</p>
              </div>
              <div
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={logoutUser}
              >
                <p style={{ color: "red" }}>Logout</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {user.isFreelancer ? <FreelancerUser /> : <RegisterAsFreelancer />}
        <hr />
        {user.isRecruiter ? <RecruiterUser /> : <RegisterAsRecruiter />}
      </div>}
    </div>
  );
};
export default Dashboard;
