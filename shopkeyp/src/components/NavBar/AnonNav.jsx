import React from "react";
import { NavLink } from 'react-router-dom';

const AnonNav = () => {
  return (
    <>
      <NavLink className="NavBar-link" to="/register">
        Register
      </NavLink>
      <NavLink className="NavBar-link" to="/login">
        Login
      </NavLink>
    </>
  );
};

export default AnonNav;