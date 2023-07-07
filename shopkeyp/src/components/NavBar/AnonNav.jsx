import React from "react";
import { NavLink } from 'react-router-dom';

const AnonNav = () => {
  return (
    <div>
      <NavLink className="NavBar-link" to="/register">
        Register
      </NavLink>
      <span className="NavBar-link">/</span>
      <NavLink className="NavBar-link" to="/login">
        Login
      </NavLink>
    </div>
  );
};

export default AnonNav;