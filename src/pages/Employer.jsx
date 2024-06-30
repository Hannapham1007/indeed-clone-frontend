
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Employer() {
    const animatedImage =
    "https://images.ctfassets.net/pdf29us7flmy/5r34jiS1YfJuoRzqp3XH6y/6fba6547e16cd0ad08ae28dad306015d/Screen_Shot_2023-01-11_at_9.21.31_AM.png?w=720&q=100&fm=avif";
    const loggedInUser = localStorage.getItem("loggedInUser");
    const navigate = useNavigate();
    const isLoggedInUser = () => {
      if (loggedInUser) {
        navigate("/create_job_post");
      } else {
        navigate("/auth");
      }
    };

  return (
    <div className="large-space">
      {/* Main content section */}
      <div className="container my-4">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12 text-center text-lg-start">
            <h2>Recruit with Indeed.</h2>
            <div className="mt-4">
              <button className="btn btn-primary" onClick={isLoggedInUser}>Post a job</button>
            </div>
          </div>
          <div className="col-lg-6 col-12 text-center">
            <img src={animatedImage} alt="homeimage" className="w-100" />
          </div>
        </div>
      </div>

      {/* Cards section */}
      <div className="container my-4">
        <div className="row gx-4">
          <div className="col-lg-4 col-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">1</h5>
                <h5 className="card-title">Create a free account</h5>
                <p className="card-text">
                  All you need to create an account and post jobs is your email
                  address.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">2</h5>
                <h5 className="card-title">Design your job ad</h5>
                <p className="card-text">
                  Add information such as title, description and location for
                  the job and you're done.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">3</h5>
                <h5 className="card-title">Publish your job</h5>
                <p className="card-text">
                  Once you've posted your job, you can use our state-of-the-art
                  tools to find the talent you're looking for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employer
