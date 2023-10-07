import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditSkills.css";
import { toast } from "react-hot-toast";
import useAxios from "../utils/useAxios";

const EditSkills = () => {
  const navigate = useNavigate();
  const api = useAxios();
  const [skill1, setSkill1] = useState(null);
  const [skill2, setSkill2] = useState(null);
  const [skill3, setSkill3] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (skill1) {
      console.log(skill1, skill2, skill3);
      const response = await api.patch("/users/skills/", {
        skill1,
        skill2,
        skill3,
      });
      if (response.status === 200) {
        toast.success("Successfully Edited Skills");
        navigate("/dashboard");
      } else {
        toast.error("Error in editing skills");
      }
    } else {
      toast.error("Please select all the skills");
    }
  };

  const Skills = [
    {
      id: 0,
      name: "Select",
    },
    {
      id: 1,
      name: "Web Development",
    },
    {
      id: 2,
      name: "Video Editing",
    },
    {
      id: 3,
      name: "App Development",
    },
    {
      id: 4,
      name: "Machine Learning",
    },
    {
      id: 5,
      name: "Poster Design",
    },
    {
      id: 6,
      name: "Graphic Design",
    },
    {
      id: 7,
      name: "Photography",
    },
    {
      id: 8,
      name: "Other",
    },
  ];

  return (
    <>
      <div className="editSkills-mainContainer">
        <div className="editSkills-container">
          <div className="editSkills-header">
            <h1>Add Your Skills</h1>
          </div>
          <div className="editSkills-form">
            <form onSubmit={handleSubmit}>
              <label>
                Add your Skill number 1:
                <select
                  name="skill1"
                  onChange={(e) => setSkill1(e.target.value)}
                  value={skill1}
                >
                  <option value="none" selected disabled hidden>
                    Select your Skill 1
                  </option>
                  {Skills.filter(
                    (skill) => skill.name !== skill2 && skill.name !== skill3
                  ).map((skill) => (
                    <option value={skill.name}>{skill.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Add your Skill number 2: onChange=
                {(e) => setSkill2(e.target.value)}
                <select
                  name="skill2"
                  onChange={(e) => setSkill2(e.target.value)}
                  value={skill2}
                >
                  <option value="none" selected disabled hidden>
                    Select your Skill 2
                  </option>
                  {Skills.filter(
                    (skill) => skill.name !== skill1 && skill.name !== skill3
                  ).map((skill) => (
                    <option value={skill.name}>{skill.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Add your Skill number 3:
                <select
                  name="skill3"
                  onChange={(e) => setSkill3(e.target.value)}
                  value={skill3}
                >
                  <option value="none" selected disabled hidden>
                    Select your Skill 3
                  </option>
                  {Skills.filter(
                    (skill) => skill.name !== skill1 && skill.name !== skill2
                  ).map((skill) => (
                    <option value={skill.name}>{skill.name}</option>
                  ))}
                </select>
              </label>
              <div className="editSkills-submit">
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSkills;
