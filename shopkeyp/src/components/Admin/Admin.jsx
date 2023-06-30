import React from "react";
import { NavLink, useParams } from 'react-router-dom';
import './Admin.css'
import { Toolbar } from '@mui/material';
import Users from '../Users/Users';
import Items from '../Items/Items';
import Transactions from '../Transactions/Transactions';

const Admin = () => {
  const {tab} = useParams();
  console.log(tab)

  const currentTab = () => {
    switch(tab) {
      case "users": return <Users />;
      case "items": return <Items />;
      case "transactions": return <Transactions />;
      default: return <p>Admin Stats</p>
    }
  }

  return (
    <>
      <h1>Admin Page</h1>
      <Toolbar className="Admin-toolbar">
        <NavLink className="Admin-link" to="/admin/users">Users</NavLink>
        <NavLink className="Admin-link" to="/admin/transactions">Transactions</NavLink>
        <NavLink className="Admin-link" to="/admin/items">Items</NavLink>
      </Toolbar>
      <div className="Admin-stats">
        {currentTab()}
      </div>
    </>
  );
};

export default Admin;