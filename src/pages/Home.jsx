import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../App";
import SearchBar from "../components/SearchBar";
import AllJobPosts from "../components/AllJobPosts";
import JobPostDetails from "../components/JobPostDetails";

function Home() {
  const { posts } = useContext(PostContext);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const sortPostsByDate = (posts) => {
    return posts.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const handleSearch = (keyword, location) => {
    let filteredResults = posts;
    if (keyword) {
      filteredResults = filteredResults.filter(
        (post) =>
          post.title.toLowerCase().includes(keyword.toLowerCase()) ||
          post.description.toLowerCase().includes(keyword.toLowerCase()) ||
          post.company.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (location) {
      filteredResults = filteredResults.filter((post) =>
        post.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    filteredResults = sortPostsByDate(filteredResults);

    setFilteredPosts(filteredResults);
    setSelectedPost(filteredResults.length > 0 ? filteredResults[0] : null);
  };

  useEffect(() => {
    setIsLoading(true);
    const sortedPosts = sortPostsByDate(posts);
    setFilteredPosts(sortedPosts);
    setSelectedPost(sortedPosts.length > 0 ? sortedPosts[0] : null);
    setIsLoading(false);
  }, [posts]);

  const handlePostClick = (post) => {
    if (window.innerWidth < 768) {
      navigate(`/job_post_details/${post.id}`);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <section className="container small-space">
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-10 col-12">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <h4 className="fw-bold text-center py-4 border-bottom">Job Flow</h4>
      {isLoading ? (
        <div>
          <p>Loading</p>
          <div className="loader"></div>
        </div>
      ) : (
        <div className="row small-space">
          <div className="col-md-6 col-12 vh-100 custom-scrollbar">
            <AllJobPosts
              postList={filteredPosts}
              onPostClick={handlePostClick}
            />
          </div>
          <div className="col-md-6 d-none d-md-block">
            {selectedPost && <JobPostDetails jobPost={selectedPost} />}
          </div>
        </div>
      )}
    </section>
  );
}

export default Home;
