import React, { useState } from "react";
import { authSignup } from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup({setIsLogIn}) {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: ["admin"],
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const signup = async () => {
    try {
      const response = await authSignup(userData);
      if (response) {
        alert("Your account has been successfully created!");
        setIsLogIn(true);
        navigate("/auth")
      }
    } catch (error) {
      setError(error.message || "Signup failed");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    signup();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-12">
          <form
            onSubmit={handleSubmit}
            className="w-100 border rounded-3 px-4 py-4"
          >
              {error && <div className="mt-3 text-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label mb-0" htmlFor="role">
                I am
              </label>
              <select
                className="form-select mb-3"
                id="role"
                name="role"
                disabled
              >
                <option>Recruiter</option>
              </select>

              <label className="form-label mb-0" htmlFor="username_signup">
                Username
              </label>
              <input
                className="form-control mb-3"
                id="username_signup"
                type="text"
                name="username"
                placeholder="Enter username"
                autoComplete="off"
                value={userData.username}
                onChange={handleChange}
                required
              ></input>
              <label className="form-label mb-0 " htmlFor="email">
                Email
              </label>
              <input
                className="form-control mb-3"
                id="email"
                type="email"
                name="email"
                placeholder="Email@gmail.com"
                autoComplete="off"
                value={userData.email}
                onChange={handleChange}
                required
              ></input>
              <label className="form-label mb-0" htmlFor="password_signup">
                Password
              </label>
              <input
                className="form-control mb-3"
                id="password_signup"
                type="password"
                name="password"
                placeholder="Enter password"
                autoComplete="off"
                value={userData.password}
                onChange={handleChange}
                required
              ></input>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary" type="submit">
                  Create Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
