import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import indeed_logo_image from "../assets/Indeed_Logo_RGB.png";

function Header() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const isLoggedInUser = (event) => {
    event.preventDefault();
    if (loggedInUser) {
      navigate("/create_job_post");
    } else {
      navigate("/auth");
    }
  };
  const toggleNavbar = () => {
    setIsNavbarExpanded(!isNavbarExpanded);
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
        <div className="d-flex">
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
            aria-expanded={isNavbarExpanded} 
            aria-label="Toggle navigation"
            onClick={toggleNavbar}
          >
            <span>
            {isNavbarExpanded ? (
                <i className="bi bi-x-lg fs-2"></i> 
              ) : (
                <i className="bi bi-list fs-2"></i> 
              )}
            </span>
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
              {loggedInUser ? (<NavLink className="nav-link" to="/my_job_posts">My posted jobs</NavLink>) : ("")}
            </li>
            <li className="nav-item" >
              <NavLink className="nav-link" to="/create_job_post" onClick={isLoggedInUser}>
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