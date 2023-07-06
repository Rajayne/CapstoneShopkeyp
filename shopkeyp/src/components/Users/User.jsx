import React, { useEffect, useState, useContext } from "react";
import ShopkeypApi from '../Api/Api';
import './User.css'
import UserContext from '../Hooks/UserContext';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Transactions from '../Transactions/Transactions';
import Inventory from './Inventory';
import UpdateUserForm from './UserForm';
import jwt_decode from "jwt-decode"

const User = () => {
  const authHeader = localStorage.getItem('token')
  const [user, setUser] = useContext(UserContext)
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const {tab} = useParams();

  useEffect(() => {
    if (!user && authHeader) {
      setUser(jwt_decode(authHeader))
      return;
    }
    if (!user) {
      alert("Please register or login to view this page.")
      navigate('/login')
    }
    async function getUser() {
      const res = await ShopkeypApi.getUser(user.username, authHeader);
      setUserData(await res);
      setIsLoading(false);
    }
    if (user) {
      getUser();
    }
  }, [authHeader, navigate, setUser, user]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  const handleClick = () => {
    navigate('/profile/edit')
  }

  const currentTab = () => {
    switch(tab) {
      case "edit": return <UpdateUserForm />;
      case "inventory": return <Inventory />;
      case "transactions": return <Transactions />;
      default: return <p>User Info</p>
    }
  }

  return (
    <>
      <div className="User-profilebar">
        <img className="User-image" src={userData.profileImage} alt=""></img>
        <div className="User-info">
          <h1 className="User-name">{userData.username}'s Profile Page</h1>
          <p>Balance: {userData.balance}gp</p>
          <button onClick={handleClick}>Edit Profile</button>
        </div>
      </div>
      <table className="User-table">
          <tbody className="User-body">
            <tr className="User-title">
              <td><NavLink className="User-link" to="/profile/inventory">Inventory</NavLink></td>
              <td><NavLink className="User-link" to="/profile/transactions">Transactions</NavLink></td>
            </tr>
          </tbody>
        </table>
        {currentTab()}
    </>
  );
};

export default User;