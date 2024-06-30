import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function JobPost({ jobPost }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prevShowFullDescription) => !prevShowFullDescription);
  };

  const words = jobPost.description.split(" ");

  const descriptionToShow = showFullDescription
    ? jobPost.description
    : words.slice(0, 30).join(" ");

  const formatDate = (createdAt) => {
    return dayjs(createdAt).fromNow();
  };

  return (
    <div className="card my-4" style={{ cursor: "pointer" }}>
      <div className="card-body">
        <h5 className="card-title mb-3">{jobPost.title}</h5>
        <h6 className="card-subtitle text-muted">{jobPost.company}</h6>
        <p className="card-text mb-3">{jobPost.location}</p>
        <div className="px-2 py-1 rounded-2 btn-primary-tint mb-2" style={{ width: 'fit-content', fontSize: '14px' }}>{jobPost.type}</div>
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
        <p className="fw-lighter" style={{ fontSize: '14px' }}>Published {formatDate(jobPost.createdAt)}</p>
      </div>
    </div>
  );
}

export default JobPost;
