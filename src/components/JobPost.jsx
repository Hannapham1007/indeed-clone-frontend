import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { saveJob, unsaveJob } from "../services/api";
import { SavedJobContext } from "../App";

dayjs.extend(relativeTime);
//TODO fix UI unsave book mark 
function JobPost({ jobPost }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isSaved, setIsSaved] = useState(false); 
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const token = localStorage.getItem("token");
  const { savedJobs, setSavedJobs } = useContext(SavedJobContext);

  const toggleDescription = () => {
    setShowFullDescription((prevShowFullDescription) => !prevShowFullDescription);
  };

  const words = jobPost.description.split(" ");
  const descriptionToShow = showFullDescription ? jobPost.description : words.slice(0, 30).join(" ");
  
  const formatDate = (createdAt) => {
    return dayjs(createdAt).fromNow();
  };

  useEffect(() => {
    const jobExists = savedJobs.some((savedJob) => savedJob.job.id === jobPost.id);
    setIsSaved(jobExists);
  }, [savedJobs, jobPost.id]);

  const onSaveClick = async () => {
    if (isSaved) {
      // Unsave the job
      const theSavedJob = savedJobs.find((savedJob) => savedJob.job.id === jobPost.id);
      const response = await unsaveJob(theSavedJob.id, token); 
      if (response && response.success) {
        const updatedSavedJobs = savedJobs.filter((savedJob) => savedJob.job.id !== jobPost.id);
        setSavedJobs(updatedSavedJobs);
        setIsSaved(false);
      }
    } else {
      // Save the job
      const response = await saveJob(loggedInUser.id, jobPost.id, token);
      if (response && response.data) {
        const updatedSavedJobs = [...savedJobs, response.data];
        setSavedJobs(updatedSavedJobs);
        setIsSaved(true);
      }
    }
  };

  const handleSaveJob = () => {
    onSaveClick();
  };

  return (
    <div className="card my-4" style={{ cursor: "pointer" }}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title mb-3">{jobPost.title}</h5>
          <button
            className=" px-2 py-1 rounded-2 btn-primary-tint mb-2 border-0"
            onClick={handleSaveJob}
          >
            {isSaved ? (
              <i className="bi bi-bookmark-fill"></i>
            ) : (
              <i className="bi bi-bookmark"></i>
            )}
          </button>
        </div>

        <h6 className="card-subtitle text-muted">{jobPost.company}</h6>
        <p className="card-text mb-3">{jobPost.location}</p>
        <div
          className="px-2 py-1 rounded-2 btn-primary-tint mb-2"
          style={{ width: "fit-content", fontSize: "14px" }}
        >
          {jobPost.type}
        </div>
        <p className="card-text">
          {descriptionToShow}
          {words.length > 30 && (
            <span
              onClick={toggleDescription}
              style={{
                color: "var(--primarycolor)",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {showFullDescription ? " Show less" : " ... Show more"}
            </span>
          )}
        </p>
        <p className="fw-lighter" style={{ fontSize: "14px" }}>
          Published {formatDate(jobPost.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default JobPost;
