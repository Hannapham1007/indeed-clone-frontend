import React, { useState } from "react";
import { authSignin, getUserById } from "../services/api";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [signinCredentials, setSigninCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const response = await authSignin(signinCredentials);

      if (response && response.token) {
        const jwtToken = response.token;
        localStorage.setItem("token", jwtToken);
        const getUser= await getUserById(response.id, jwtToken);
        localStorage.setItem("loggedInUser", JSON.stringify(getUser.data));
        navigate("/employer");
      } else {
        setError("");
      }
    } catch (error) {
      setError("Failed to sign in, username or password is incorrect.");
    }
  };

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSigninCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signin();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-12">
          <form
            onSubmit={handleSubmit}
            className="w-100 border rounded-3 px-4 py-4"
          >
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={signinCredentials.username}
                onChange={handleChange}
                name="username"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={signinCredentials.password}
                onChange={handleChange}
                name="password"
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary my-3">
                Sign in
              </button>
            </div>
            <div className="mt-2">
              <p className="my-0 small fw-bold">Testing credientials</p>
              <p className="my-0 small fw-light">Username: iamRecruiter</p>
              <p className="my-0 small fw-light"> Password: recruiter123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
