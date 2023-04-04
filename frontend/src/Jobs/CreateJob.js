import { useContext, React } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "./../utils/useAxios";
// import axios from "axios";
import AuthContext from "./../contexts/AuthContext";
import "./CreateJob.css";

const CreateJob = () => {
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const { user } = useContext(AuthContext);

  const api = useAxios();
  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      recruiter: user.user_id,
      title: title,
      description: description,
      link: link,
    };
    const respone = await api.post("http://localhost:8000/api/job/", data);
    if (respone.status === 200) {
      console.log("Job created");
    } else {
      console.log("Job not created");
    }
  };
  return (
    <div className="create-job-mainContainer">
      <div className="create-job-container">
        <div className="create-job-header">
          <h1>Create Job</h1>
        </div>
        <div className="create-job-form">
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                onChange={(e) => settitle(e.target.value)}
                required
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <label>
              Link:
              <input
                type="url"
                name="link"
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </label>
            <div className="create-job-submit">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateJob;
