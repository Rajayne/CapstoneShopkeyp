import React, { useContext, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material'
import './NavBar.css'
import UserContext from '../Hooks/UserContext';
import jwt_decode from "jwt-decode"
import AdminNav from './AdminNav';
import UserNav from './UserNav';
import AnonNav from './AnonNav';

const NavBar = () => {
  const authHeader = localStorage.getItem('token')
  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    if (!user && authHeader) {
      setUser(jwt_decode(authHeader))
    }
  }, [authHeader, setUser, user])

  return (
    <AppBar position="fixed" style={{ background: '#2E3B55'}}>
      <Toolbar className="NavBar">
          <NavLink className="NavBar-link" to="/">
            Home
          </NavLink>
          {user && user.isAdmin? (
            <AdminNav/>
          ) : ''}
          {user !== null ? (
            <UserNav/>
          ) : ''}
          {!user ? (
            <AnonNav/>
          ) : ''}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;