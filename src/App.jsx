import "./App.css";
import Header from "./components/Header";
import CreateJobPost from "./pages/CreateJobPost";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Employer from "./pages/Employer";
import { useState, createContext, useEffect } from "react";
import { getAllPosts } from "./services/api";
import JobPostDetails from "./components/JobPostDetails";
import Auth from "./pages/Auth";
import PageNotFound from "./pages/PageNotFound";
import MyJobPosts from "./pages/MyJobPosts";
import EditJobPost from "./pages/EditJobPost";

const PostContext = createContext();

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await getAllPosts();
    setPosts(response.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <PostContext.Provider value={{ posts, setPosts }}>
        <Header></Header>
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
          <Route path="/my_job_posts" element={<MyJobPosts></MyJobPosts>}></Route>
          <Route path="/edit_job_post/:id" element={<EditJobPost></EditJobPost>}></Route>
          <Route path="/404" element={<PageNotFound></PageNotFound>}></Route>
          <Route path="*" element={<Navigate to="/404" />}></Route>
        </Routes>
      </PostContext.Provider>

    </>
  );
}

export { App, PostContext };
