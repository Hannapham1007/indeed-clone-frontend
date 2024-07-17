import React, { useContext, useEffect } from "react";
import { SavedJobContext } from "../App";


function MySavedJobs() {
    const { savedJobs } = useContext(SavedJobContext);
    useEffect(()=>{
       
    },[]);
    console.log(savedJobs)
    return (
      <div>
        {savedJobs.map((job) => (
          <ul key={job.id}>
            <li >
              <div>{job.job.title}</div>
            </li>
          </ul>
        ))}
      </div>
    );
  }
  
  export default MySavedJobs;
