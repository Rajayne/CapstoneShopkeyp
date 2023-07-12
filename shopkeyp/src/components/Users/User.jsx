import React, { useEffect, useState, useContext } from "react";
import ShopkeypApi from '../Api/Api';
import './User.css'
import UserContext from '../Hooks/UserContext';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Inventory from './Inventory';
import UpdateUserForm from './UserForm';
import jwt_decode from "jwt-decode"
import Transaction from '../Transactions/TransactionDetails';

const User = () => {
  const authHeader = localStorage.getItem('token')
  const [user, setUser] = useContext(UserContext)
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  console.log("USERDATA", userData.inventory)

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
      <div className="User-sections">
        <h3>{userData.username}'s Inventory</h3>
        <div className="User-inventory">
          {userData.inventory ? <Inventory inventory={userData.inventory}/> : "N/A"}
        </div>
        <h3>Transaction History</h3>
        <div className="User-transactions">
          <Transaction/>
        </div>
      </div>
    </>
  );
};

export default User;