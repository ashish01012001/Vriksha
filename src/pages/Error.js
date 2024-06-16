import React from "react";
import "../components/Error.css";
import { Link } from "react-router-dom";
const Error = () => {
  const err = {
    code: 404,
    message: "Page Not Found",
  };

  return (
    <>
      <div className="container">
        <div className="error-message">
          <h1>{err.code}</h1>
          <p>{err.message}</p>
          <Link to="/" className="home-button">
            Go to Homepage
          </Link>
        </div>
      </div>
    </>
  );
};
export default Error;
