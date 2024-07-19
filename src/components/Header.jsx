import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import indeed_logo_image from "../assets/Indeed_Logo_RGB.png";
import { SavedJobContext } from "../App";

function Header() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();
  const {setSavedJobs, setLocalSavedJobs} = useContext(SavedJobContext);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const isLoggedInUser = () => {
    if (loggedInUser) {
      navigate("/create_job_post");
    } else {
      navigate("/auth");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={indeed_logo_image}
            alt="logo"
            style={{ width: 95, marginBottom: 6 }}
          />
        </Link>
        <div>
          {loggedInUser ? (
            <button className="btn btn-primary d-lg-none me-2" onClick={logOut}>
              Log out
            </button>
          ) : (
            <button
              className="btn btn-primary d-lg-none me-2"
              onClick={() => navigate("/auth")}
            >
              Sign in
            </button>
          )}

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home page
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/my_saved_jobs">My saved jobs</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <li className="nav-item">
              {loggedInUser ? (<NavLink className="nav-link" to="/my_job_posts">My job posts</NavLink>) : ("")}
            </li>
            <li className="nav-item" onClick={() => isLoggedInUser()}>
              <NavLink className="nav-link">
                Post a job
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/employer">
                Employer
              </NavLink>
            </li>
            <li className="nav-item d-none d-lg-block">
              {loggedInUser ? (
                  <button className="btn btn-primary" onClick={logOut}>
                    Log out
                  </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/auth")}
                >
                  Sign in
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;