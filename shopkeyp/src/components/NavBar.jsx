import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material'
import './NavBar.css'
import UserContext from './Hooks/UserContext';

const NavBar = () => {
  const [user, setUser] = useContext(UserContext)
  return (
    <AppBar position="fixed" style={{ background: '#2E3B55'}}>
      <Toolbar className="NavBar">
          <NavLink className="NavBar-link" to="/">
            Home
          </NavLink>
          {user !== null ? (
          <NavLink className="NavBar-link" to="/admin">
            Admin
          </NavLink>
          ) : ''}
          {user !== null ? (
            <NavLink className="NavBar-link" to="/shop">
              Shop
            </NavLink>
          ) : ''}
          {user !== null ? (
            <NavLink className="NavBar-link" to="/profile">
              Profile
            </NavLink>
          ) : ''}
          {!user ? (
            <NavLink className="NavBar-link" to="/register">
              Register
            </NavLink>
          ) : ''}
          {!user ? (
            <NavLink className="NavBar-link" to="/login">
              Login
            </NavLink>
          ) : ''}
          {user !== null ? (
          <NavLink className="NavBar-link" to="/logout">
          Logout
        </NavLink>
          ) : ''}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;