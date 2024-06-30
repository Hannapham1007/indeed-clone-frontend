import React, { useContext, useState } from "react";
import { createJobPost } from "../services/api";
import { useNavigate } from "react-router-dom";
import { cities } from "../utils/cities";
import { PostContext } from "../App";

function CreateJobPost() {
  const token = localStorage.getItem("token");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const {posts, setPosts} = useContext(PostContext);
  const defaultObj = {
    title: "",
    company: "",
    type: "",
    experience: "",
    description: "",
    technology: [],
    salary: "",
    location: "",
    user: loggedInUser.id,
  };
  const [formData, setFormData] = useState(defaultObj);

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const image_create_job_post =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH3zkKYlIHjjoQrE4e-a5xiJIaK0reWlcDhewsx8rjV87d8M82";
  const options = {
    type: ["Full time", "Part time"],
    experience: ["0-2 Years", "3-5 Years", "5 Years or more"],
    technology: [
      "Java",
      "JavaScript",
      "React",
      "Angular",
      "Node.js",
      "Docker",
      "AWS",
      "HTML",
      "CSS",
    ],
    salary: [
      "Rs SEK 30000-50000 per month",
      "Rs SEK 50000-80000 per month",
      "Rs SEK 80000-100000 per month",
      "Rs SEK 100000 or more per month",
    ],
  };

  const createPost = async () => {
      const response = await createJobPost(formData, token);
      if (response && response.data) {
        setPosts([...posts, response.data]);
        navigate("/");
      }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleTechnologyChange = (e) => {
    const { value } = e.target;
    const isSelected = formData.technology.includes(value);
    if (isSelected) {
      setFormData({
        ...formData,
        technology: formData.technology.filter((tech) => tech !== value),
      });
    } else {
      setFormData({
        ...formData,
        technology: [...formData.technology, value],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
    setFormData(defaultObj);
  };

  return (
    <section style={{ minHeight: "100vh" }} className="bg-light pb-4">
      <div className="container large-space">
        <div className="d-flex align-items-center rounded-4 px-4 justify-content-between bg-white">
          <h2>Post A Job</h2>
          <img src={image_create_job_post} alt="job_post_image" />
        </div>

        <div className="d-flex align-items-center rounded-4 px-4 justify-content-between bg-white mt-4 py-4">
          <form onSubmit={handleSubmit} className="w-100">
            <div className="mb-3">
              <label className="form-label" htmlFor="company">
                Your company
              </label>
              <input
                className="form-control"
                type="text"
                id="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter your company name"
                autoComplete="off"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="location">
                Location
              </label>
              <select
                id="location"
                className="form-select mb-3"
                value={formData.location}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select a location
                </option>
                {cities.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="title">
                Job Title
              </label>
              <input
                className="form-control"
                type="text"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter job title"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="type">
                Job Type
              </label>
              <select
                id="type"
                className="form-select mb-3"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select job type
                </option>
                {options.type.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="experience">
                Experience
              </label>
              <select
                id="experience"
                className="form-select mb-3"
                value={formData.experience}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select experience
                </option>
                {options.experience.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Tech stack
              </label>
              <div className="d-flex flex-wrap">
                {options.technology.map((item, index) => (
                  <div className="form-check me-4" key={index}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`technology-${index}`}
                      value={item}
                      checked={formData.technology.includes(item)}
                      onChange={handleTechnologyChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`technology-${index}`}
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="salary">
                Salary
              </label>
              <select
                id="salary"
                className="form-select mb-3"
                value={formData.salary}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select salary range
                </option>
                {options.salary.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="description">
                Job Description
              </label>
              <textarea
                className="form-control"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter job description"
                required
              />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateJobPost;
