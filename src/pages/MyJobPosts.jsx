import React, { useContext, useEffect, useState } from "react";
import { getJobPostByUser, deleteJobPost } from "../services/api";
import JobPost from "../components/JobPost";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../App";
import ModalDelete from "../components/ModalDelete";

function MyJobPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(PostContext);
  const [showModal, setShowModal] = useState(false);

  const sortPostByDate = () => {
    return myPosts.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const getPost = async () => {
    const response = await getJobPostByUser(loggedInUser.id, token);
    if (response && response.data) {
      setMyPosts(response.data);
    }
  };

  const deleteJobPostByPostId = async (id) => {
    try {
      await deleteJobPost(token, id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      setMyPosts((prevData) => prevData.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Failed to delete job post:", error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const postList = sortPostByDate(myPosts.jobs) || [];

  const handleEdit = (id) => {
    navigate(`/edit_job_post/${id}`);
  };

  const handleDelete = (id) => {
    setSelectedJobId(id);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    deleteJobPostByPostId(selectedJobId);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedJobId(null);
  };

  return (
    <div className="container pt-4">
      <h4 className="text-center fw-bold">Job Posts</h4>
      {postList.length < 1 ? (
        <div className="small-space text-center">
          <p className="fw-bold mb-0">You haven't posted any jobs yet</p>
          <p>Jobs that you post will be displayed here</p>
          <button className="btn btn-primary" onClick={()=> navigate('/create_job_post')}>Post a job</button>
        </div>
      ) : (
        <ul className="list-unstyled">
          {postList.map((job) => (
            <li key={job.id} className="mb-3">
              <div className="card-body">
                <JobPost jobPost={job} />
                <div
                  className="d-flex justify-content-end"
                  style={{ marginTop: "-25px" }}
                >
                  <button
                    className="btn btn-link"
                    style={{ color: "var(--primarycolor)" }}
                    onClick={() => handleEdit(job.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-link"
                    style={{ color: "var(--accentcolor)" }}
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <ModalDelete
          onDelete={handleDeleteConfirm}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default MyJobPosts;
