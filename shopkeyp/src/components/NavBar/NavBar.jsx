import React, { useContext, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material'
import './NavBar.css'
import UserContext from '../Hooks/UserContext';
import AdminNav from './AdminNav';
import UserNav from './UserNav';
import AnonNav from './AnonNav';
import HomeNav from './HomeNav';

const NavBar = () => {
  const [user, setUser] = useContext(UserContext)

  return (
    <AppBar position="sticky" style={{ background: '#2E3B55'}}>
      <Toolbar className="NavBar">
        <div className="NavBar-left">
          <HomeNav className="NavBar-home"/>
        </div>
          {user && user.isAdmin? (
            <AdminNav className="NavBar-admin"/>
          ) : ''}
          {user !== null ? (
              <UserNav className="NavBar-user"/>
          ) : ''}
          {!user ? (
              <AnonNav className="NavBar-anon"/>
          ) : ''}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;