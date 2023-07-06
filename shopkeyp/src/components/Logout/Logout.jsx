import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import './Logout.css'
import UserContext from '../Hooks/UserContext';

const Logout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    const logout = async () => {
      localStorage.removeItem("token")
      setUser(null)
    }
    logout();
    setTimeout(() => {
      navigate('/')
    }, 2000);
  }, [setUser, navigate]);

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