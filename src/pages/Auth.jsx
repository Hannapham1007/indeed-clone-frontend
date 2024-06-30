import React, { useState } from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import indeed_logo_image from "../assets/Indeed_Logo_RGB.png"

function Auth() {
  const [isSignin, setIsSignin] = useState(true);


  return (
    <div className="">
      <div className="d-flex align-items-center justify-content-center small-space">
      <img src={indeed_logo_image} alt="indeed_logo" style={{width:'150px'}} ></img>

      </div>

      {isSignin ? (
        <div className="small-space"  >
          <Signin></Signin>{" "}
          <p className="text-center mt-4">
            Don't have an account? 
            <span
              className="fw-bold text-decoration-underline mx-2"
              onClick={() => setIsSignin(false)}
              role="button"
            >
              Sign Up
            </span>
          </p>
        </div>
      ) : (
        <div className="small-space">
          <Signup></Signup>
          <p className="text-center mt-4">
            Already have an account?
            <span
              className="fw-bold text-decoration-underline mx-2"
              onClick={() => setIsSignin(true)}
              role="button"
            >
              Sign In
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Auth;
