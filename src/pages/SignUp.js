import React, { useEffect } from "react";
import SignUpForm from "../components/SignUpForm";

import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) return navigate("/");
  }, []);

  return (
    <>
      <SignUpForm />
    </>
  );
};
export default SignUp;
