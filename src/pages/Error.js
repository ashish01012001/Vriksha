import React, { useState } from "react";
import "../components/Error.css";
import { useRouteError,Link } from "react-router-dom";
const Error = () => {
  const [err,setError]=useState({
    code:404,
    message:"Page Not Found"
  })
  
  const error=useRouteError();
  
  
  return (
    <>
      <div className="container">
        <div className="error-message">
          
            <h1>{err.code}</h1>
            <p>{err.message}</p>
            <Link to="/" className="home-button">Go to Homepage</Link>
        </div>
    </div>
    </>
  );
};
export default Error;