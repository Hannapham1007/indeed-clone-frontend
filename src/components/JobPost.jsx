import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { saveJob, unsaveJob } from "../services/api";
import { SavedJobContext } from "../App";

dayjs.extend(relativeTime);

function JobPost({ jobPost }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const token = localStorage.getItem("token");
  const { savedJobs, setSavedJobs, localSavedJobs, setLocalSavedJobs } = useContext(SavedJobContext);
  const [isSaved, setIsSaved] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(prev => !prev);
  };

  const words = jobPost.description.split(" ");
  const descriptionToShow = showFullDescription ? jobPost.description : words.slice(0, 30).join(" ");

  const formatDate = (createdAt) => {
    return dayjs(createdAt).fromNow();
  };

  useEffect(() => {
    if (loggedInUser) {
      const jobExists = savedJobs.some(savedJob => savedJob.job.id === jobPost.id);
      setIsSaved(jobExists);
    } else {
      const jobExists = localSavedJobs.some(savedJob => savedJob.id === jobPost.id);
      setIsSaved(jobExists);
    }
  }, [savedJobs, jobPost.id, localSavedJobs, loggedInUser]);

  const onSaveClick = async () => {
    if (!loggedInUser) {
      const jobExists = localSavedJobs.some(savedJob => savedJob.id === jobPost.id);

      if (jobExists) {
        // Unsave the local saved job
        const updatedSavedJobs = localSavedJobs.filter(savedJob => savedJob.id !== jobPost.id);
        setLocalSavedJobs(updatedSavedJobs);
        localStorage.setItem("localSavedJobs", JSON.stringify(updatedSavedJobs));
        setIsSaved(false);
      } else {
        // Save the job
        const updatedSavedJobs = [...localSavedJobs, { id: jobPost.id, job: jobPost }];
        setLocalSavedJobs(updatedSavedJobs);
        localStorage.setItem("localSavedJobs", JSON.stringify(updatedSavedJobs));
        setIsSaved(true);
      }
    } else {
      const jobExists = savedJobs.some(savedJob => savedJob.job.id === jobPost.id);

      if (jobExists) {
        // Unsave the job
        const theSavedJob = savedJobs.find(savedJob => savedJob.job.id === jobPost.id);
        if (theSavedJob) {
          const response = await unsaveJob(theSavedJob.id, token);
          if (response && response.data) {
            const updatedSavedJobs = savedJobs.filter(savedJob => savedJob.job.id !== jobPost.id);
            setSavedJobs(updatedSavedJobs);
            setIsSaved(false);
          }
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
    }
  };

  return (
    <div className="card my-4" style={{ cursor: "pointer" }}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title mb-3">{jobPost.title}</h5>
          <button
            className="px-2 py-1 rounded-2 btn-primary-tint mb-2 border-0"
            onClick={onSaveClick}
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
