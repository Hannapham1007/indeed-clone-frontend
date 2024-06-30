import React from "react";
import JobPost from "./JobPost";

function AllJobPosts({ postList, onPostClick }) {
  return (
    <ul className="px-0">
      {postList.map((post) => (
        <li key={post.id} onClick={() => onPostClick(post)} className="my-3">
          <JobPost jobPost={post} />
        </li>
      ))}
    </ul>
  );
}

export default AllJobPosts;
