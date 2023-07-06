import React from "react";
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
  return (
    <>
      <NavLink className="NavBar-link" to="/admin">
        Admin
      </NavLink>
    </>
  );
};

export default AdminNav;