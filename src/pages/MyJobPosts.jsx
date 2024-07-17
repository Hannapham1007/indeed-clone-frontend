import React, { useContext, useEffect, useState } from "react";
import { getUserById, deleteJobPost } from "../services/api";
import JobPost from "../components/JobPost";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../App";
import ModalDelete from "../components/ModalDelete";

function MyJobPosts() {
  const [myPosts, setMyPosts] = useState({ jobs: [] });
  const [selectedJobId, setSelectedJobId] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(PostContext);
  const [showModal, setShowModal] = useState(false);

  console.log(loggedInUser)
  const sortPostByDate = (posts) =>{
    return posts.slice().sort((a,b)=>{
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
  }

  const getPostByUserId = async () => {
    const response = await getUserById(loggedInUser.id, token);
    if (response && response.data) {
      setMyPosts({
        ...response.data,
        jobs: response.data.jobs || [] 
      });
    }
  };

  const deleteJobPostByPostId = async (id) => {
    try {
      await deleteJobPost(token, id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      setMyPosts((prevData) => ({
        ...prevData,
        jobs: prevData.jobs.filter((job) => job.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete job post:", error);
    }
  };

  useEffect(() => {
    getPostByUserId();
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
