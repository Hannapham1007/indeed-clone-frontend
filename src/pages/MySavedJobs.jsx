import React, { useContext } from "react";
import { PostContext, SavedJobContext } from "../App";
import JobPost from "../components/JobPost";
import { useNavigate } from "react-router-dom";

function MySavedJobs() {
  const { savedJobs, localSavedJobs } = useContext(SavedJobContext);
  const { posts } = useContext(PostContext);
  const loggedInUser = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();

  const getJobDetails = (jobId) => {
    return posts.find((post) => Number(post.id) === Number(jobId));
  };

  if (!loggedInUser) {
    return (
      <div className="container">
        <h2 className="small-space">My Jobs</h2>
        {localSavedJobs.length < 1 ? (
          <div className="small-space text-center">
            <p className="fw-bold mb-0">No jobs have been saved yet</p>
            <p>Jobs that you save are displayed here</p>
            <button className="btn btn-primary" onClick={()=>navigate('/')}>Find a job</button>
          </div>
        ) : (
          localSavedJobs.map((savedJob) => {
            const jobDetails = getJobDetails(savedJob.id);
            return (
              <div key={savedJob.id}>
                <JobPost jobPost={jobDetails} />
              </div>
            );
          })
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="small-space">My Jobs</h2>
      {savedJobs.length < 1 ? (
        <div className="small-space text-center">
          <p className="fw-bold mb-0">No jobs have been saved yet</p>
          <p>Jobs that you save are displayed here</p>
          <button className="btn btn-primary" onClick={()=>navigate('/')}>Find a job</button>
        </div>
      ) : (
        savedJobs.map((savedJob) => {
          const jobDetails = getJobDetails(savedJob.job.id);
          return (
            <div key={savedJob.job.id}>
              <JobPost jobPost={jobDetails} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default MySavedJobs;
