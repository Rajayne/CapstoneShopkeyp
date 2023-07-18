import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './Admin.css'
import Users from '../Admin/Users';
import Items from './Items';
import AdminTransactions from './AdminTransactions';
import AdminDashboard from './AdminDashboard';
import { Button } from '@mui/material';
import UserContext from '../Hooks/UserContext';

const Admin = () => {
  const [user, setUser] = useContext(UserContext)
  const navigate = useNavigate();
  const authHeader = localStorage.getItem('token')

  useEffect(() => {
    if (!user || !authHeader) {
      navigate('/login')
    }
  }, [user, navigate, authHeader])

  const {tab} = useParams();

  const currentTab = () => {
    switch(tab) {
      case "users": return <Users/>;
      case "items": return <Items/>;
      case "transactions": return <AdminTransactions/>;
      default: return <AdminDashboard/>
    }
  }

  const handleClick = () => {
    if (tab) {
      return navigate(`/admin/${tab}/new`)
    }
  };

  const button = () => {
    if (tab) {
      return <Button variant="outlined" onClick={handleClick}>Add {tab}</Button>
    }
  };

  if (user && user.isAdmin) {
    return (
      <>
        <h1>Admin Dashboard</h1>
        <div className="Admin-buttons">
          {button()}
        </div>
        <div className="Admin-tab">{tab}</div>
        <div className="Admin-content">
          {currentTab()}
        </div>
      </>
      );
  }
};

export default Admin;