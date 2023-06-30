import React, { useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import './Logout.css'

const Logout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  console.log(token)

  const clearToken = () => {
    localStorage.removeItem("token")
  }

  clearToken();

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2000);
  }, [navigate]);

  return (
    <>
      <h1>Logging Out</h1>
      <p>Redirecting to Home Page...</p>
      <p className="Redirect-text">Click <NavLink className="Home-link" to="/">
            here
          </NavLink> if you are not immediately redirected.</p>
    </>
  );
};

export default Logout;