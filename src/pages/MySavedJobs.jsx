import React, { useContext, useEffect, useState } from "react";
import { PostContext, SavedJobContext } from "../App";
import JobPost from "../components/JobPost";

function MySavedJobs() {
  const { savedJobs } = useContext(SavedJobContext);
  const { posts } = useContext(PostContext);
  const getJobDetails = (jobId) => {
    return posts.find((post) => Number(post.id) === Number(jobId));
  };

  return (
    <div className="container">
      <h2 className=" small-space">My Jobs</h2>
      {savedJobs.length < 1 ? (
        <div className=" small-space text-center">
          <p className="fw-bold mb-0">No jobs have been saved yet</p>
          <p>Jobs that you save are displayed here</p>
          <button className="btn btn-primary">Find a jobs</button>
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
