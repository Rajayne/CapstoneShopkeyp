import React from "react";
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material'
import './NavBar.css'

const NavBar = () => {
  return (
    <AppBar position="fixed" style={{ background: '#2E3B55'}}>
      <Toolbar className="NavBar">
          <NavLink className="NavBar-link" to="/">
            Home
          </NavLink>
          <NavLink className="NavBar-link" to="/admin">
            Admin
          </NavLink>
          <NavLink className="NavBar-link" to="/shop">
            Shop
          </NavLink>
          <NavLink className="NavBar-link" to="/profile">
            Profile
          </NavLink>
          <NavLink className="NavBar-link" to="/register">
            Register
          </NavLink>
          <NavLink className="NavBar-link" to="/login">
            Login
          </NavLink>
          <NavLink className="NavBar-link" to="/logout">
            Logout
          </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;