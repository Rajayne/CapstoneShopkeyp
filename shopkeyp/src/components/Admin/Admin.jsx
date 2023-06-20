import React from "react";
import { NavLink } from 'react-router-dom';
import './Admin.css'
import { Toolbar } from '@mui/material';

const Admin = () => {
  return (
    <>
      <h1>Admin Page</h1>
      <Toolbar className="Admin-toolbar">
        <NavLink className="Admin-link" to="/admin/users">Users</NavLink>
        <NavLink className="Admin-link" to="/admin/transactions">Transactions</NavLink>
        <NavLink className="Admin-link" to="/admin/items">Items</NavLink>
      </Toolbar>
      <div className="Admin-stats">
        <p>Admin Stats</p>
      </div>
    </>
  );
};

export default Admin;