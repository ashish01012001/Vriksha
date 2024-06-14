import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";

import { useNavigate } from "react-router-dom";
const LogIn = () => {
  const navigate=useNavigate();
  
  useEffect(()=>{
    if(localStorage.getItem("isLoggedIn"))
      return navigate('/')
  },[])
  return (
    <>
      <LoginForm/>
    </>
  );
};
export default LogIn;