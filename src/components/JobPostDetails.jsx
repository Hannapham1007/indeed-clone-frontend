import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../App";

function JobPostDetails({ jobPost }) {
  const { posts } = useContext(PostContext);
  const { id } = useParams();
  const [post, setPost] = useState(jobPost || null);

  useEffect(() => {
    if (!jobPost && id && posts && posts.length > 0) {
      const selectedPost = posts.find(
        (postItem) => String(postItem.id) === String(id)
      );
      setPost(selectedPost);
    } else if (jobPost) {
      setPost(jobPost);
    }
  }, [id, posts, jobPost]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="card my-4 job-card container">
      <div className="card-body">
        <h4 className="card-title mb-3 fw-bold">{post.title}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{post.company}</h6>
        <div
          className="px-2 py-1 rounded-2 btn-primary-tint mb-3"
          style={{ width: "fit-content", fontSize: "14px" }}
        >
          {post.type}
        </div>

        <h5 className="fw-bold">City</h5>
        <div className="d-flex text-muted align-items-center mb-3">
        <i className="bi bi-geo-alt-fill"></i>
          <h6 className="card-subtitle mx-1 mt-1">{post.location}</h6>
        </div>
        <hr></hr>
        <h5 className="fw-bold">Full job description</h5>

        <p className="card-text ">{post.description}</p>
        <p className="card-text">
          <span className="text-muted fw-bold">Experience:</span>{" "}
          {post.experience}
        </p>
        <p className="card-text">
          <span className="text-muted fw-bold">Salary:</span> {post.salary}
        </p>
        <p className="card-text">
          <span className="text-muted fw-bold">Technologies:</span>{" "}
          {post.technology.join(", ")}
        </p>
      </div>
    </div>
  );
}

export default JobPostDetails;
