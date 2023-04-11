import { useContext, React } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "./../utils/useAxios";
import AuthContext from "./../contexts/AuthContext";
import "./CreateJob.css";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";

const CreateJob = () => {
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const { user } = useContext(AuthContext);
  const Backend_URL = API_BASE_URL;
  const navigate = useNavigate();

  const api = useAxios();
  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.category.value);
    console.log(category);
    const data = {
      recruiter: user.user_id,
      title: title,
      description: description,
      link: link,
      category: category,
    };
    const response = await api.post( Backend_URL + "/job/", data);
    if (response.status === 201) {
      const resp = await api.post(Backend_URL + "/recruiterdetails/", {id : response.data.id});
      if (resp.status === 200) {
        console.log(resp.data);
        console.log("Job created");
        toast.success("Job created successfully");
        navigate("/dashboard");
      }
    } else {
      console.log("Job not created");
      toast.error("Job not created");
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
              Job Type:
              <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Web_Development">Web Development</option>
                <option value="App_Development">App Development</option>
                <option value="Machine_Learning">Machine Learning</option>
                <option value="Poster_Design">Poster Design</option>
                <option value="Video_Editing">Video Editing</option>
                <option value="Graphic_Design">Graphic Design</option>
                <option value="Photography">Photography</option>
                <option value="Other">Other</option>
              </select>
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
