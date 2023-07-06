import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './Admin.css'
import Users from '../Users/Users';
import Items from '../Items/Items';
import Transactions from '../Transactions/Transactions';
import UserContext from '../Hooks/UserContext';

const Admin = () => {
  const [user, setUser] = useContext(UserContext)
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      console.log(!user, user)
      alert("You must be an admin to view this page.")
      navigate('/', {state: {message:'You must be an admin to view this page.'}})
      return;
    }
  }, [user, navigate])

  const {tab} = useParams();

  const currentTab = () => {
    switch(tab) {
      case "users": return <Users />;
      case "items": return <Items />;
      case "transactions": return <Transactions />;
      default: return <p>Admin Stats</p>
    }
  }

  if (user && user.isAdmin) {
    return (
      <>
        <h1>Admin Page</h1>
        <table className="Admin-table">
          <tbody className="Admin-body">
            <tr className="Admin-title">
              <td><NavLink className="Admin-link" to="/admin/users">Users</NavLink></td>
              <td><NavLink className="Admin-link" to="/admin/transactions">Transactions</NavLink></td>
              <td><NavLink className="Admin-link" to="/admin/items">Items</NavLink></td>
            </tr>
          </tbody>
        </table>
        {currentTab()}
      </>
    );
  }
};

export default Admin;