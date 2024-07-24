import "./App.css";
import Header from "./components/Header";
import CreateJobPost from "./pages/CreateJobPost";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Employer from "./pages/Employer";
import { useState, createContext, useEffect } from "react";
import { getAllPosts, getSavedJobs } from "./services/api";
import JobPostDetails from "./components/JobPostDetails";
import Auth from "./pages/Auth";
import PageNotFound from "./pages/PageNotFound";
import MyJobPosts from "./pages/MyJobPosts";
import EditJobPost from "./pages/EditJobPost";
import MySavedJobs from "./pages/MySavedJobs";

const PostContext = createContext();
const SavedJobContext = createContext();

function App() {
  const [posts, setPosts] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [localSavedJobs, setLocalSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const token = localStorage.getItem("token");

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const response = await getAllPosts();
      setPosts(response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const getSavedJobPosts = async () => {
    const response = await getSavedJobs(loggedInUser.id, token);
    setSavedJobs(response.data);
  };

  useEffect(() => {
    getPosts();
    if (loggedInUser && token) {
      getSavedJobPosts();
    }
  }, []);

  return (
    <>
      <PostContext.Provider value={{ posts, setPosts }}>
        <SavedJobContext.Provider
          value={{ savedJobs, setSavedJobs, localSavedJobs, setLocalSavedJobs }}
        >
          <Header></Header>
          {isLoading ? (
            <div className="d-flex flex-column align-items-center mt-4">
              <p>Loading</p>
              <div className="loader"></div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route
                path="/create_job_post"
                element={<CreateJobPost></CreateJobPost>}
              ></Route>
              <Route path="/employer" element={<Employer></Employer>}></Route>
              <Route
                path="/job_post_details/:id"
                element={<JobPostDetails></JobPostDetails>}
              ></Route>
              <Route path="/auth" element={<Auth></Auth>}></Route>
              <Route
                path="/my_job_posts"
                element={<MyJobPosts></MyJobPosts>}
              ></Route>
              <Route
                path="/edit_job_post/:id"
                element={<EditJobPost></EditJobPost>}
              ></Route>
              <Route
                path="/404"
                element={<PageNotFound></PageNotFound>}
              ></Route>
              <Route path="*" element={<Navigate to="/404" />}></Route>
              <Route
                path="/my_saved_jobs"
                element={<MySavedJobs></MySavedJobs>}
              ></Route>
            </Routes>
          )}
        </SavedJobContext.Provider>
      </PostContext.Provider>
    </>
  );
}

export { App, PostContext, SavedJobContext };
