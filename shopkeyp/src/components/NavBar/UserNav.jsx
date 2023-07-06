import React from "react";
import { NavLink } from 'react-router-dom';

const UserNav = () => {
  return (
    <>
      <NavLink className="NavBar-link" to="/shop">
        Shop
      </NavLink>
      <NavLink className="NavBar-link" to="/profile">
        Profile
      </NavLink>
      <NavLink className="NavBar-link" to="/logout">
        Logout
      </NavLink>
    </>
  );
};

export default UserNav;