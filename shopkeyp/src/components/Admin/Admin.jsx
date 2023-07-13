import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './Admin.css'
import Users from '../Admin/Users';
import Items from './Items';
import AdminTransactions from './AdminTransactions';
import UserContext from '../Hooks/UserContext';
import jwt_decode from "jwt-decode"
import AdminDashboard from './AdminDashboard';

const Admin = () => {
  const [user, setUser] = useContext(UserContext)
  const navigate = useNavigate();
  const authHeader = localStorage.getItem('token')

  useEffect(() => {
    if (!user && authHeader) {
      setUser(jwt_decode(authHeader))
      return;
    }
    if (!user) {
      console.log(!user, user)
      alert("You must be an admin to view this page.")
      navigate('/', {state: {message:'You must be an admin to view this page.'}})
      return;
    }
  }, [user, navigate, authHeader, setUser])

  const {tab} = useParams();

  const currentTab = () => {
    switch(tab) {
      case "users": return <Users/>;
      case "items": return <Items/>;
      case "transactions": return <AdminTransactions/>;
      default: return <AdminDashboard/>
    }
  }

  if (user && user.isAdmin) {
    return (
      <>
        <h1>Admin Page</h1>
        <div className="Admin-tab">{tab ? tab : "Dashboard"}</div>
        {currentTab()}
      </>
    );
  }
};

export default Admin;