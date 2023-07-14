import React, { useEffect, useState, useContext } from "react";
import ShopkeypApi from '../Api/Api';
import './User.css'
import UserContext from '../Hooks/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import Inventory from './Inventory';
import jwt_decode from "jwt-decode"
import TransactionsTable from '../Transactions/TransactionsTable';
import UpdateUserForm from './UserForm';

const User = () => {
  const authHeader = localStorage.getItem('token')
  const [user, setUser] = useContext(UserContext)
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {tab} = useParams();
  const navigate = useNavigate();

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

  const currentTab = () => {
    switch(tab) {
      case "edit": return <UpdateUserForm />;
      default: return (
        <div className="User-sections">
        <div className="User-title">{userData.username}'s Inventory</div>
        <div className="User-inventory">
          {userData.inventory ? <Inventory inventory={userData.inventory}/> : "N/A"}
        </div>
        <div className="User-title">Transaction History</div>
        <div className="User-transactions">
          <TransactionsTable transactions={userData.transactions}/>
        </div>
      </div>)
    }
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
      <div className="User-content">
        {currentTab()}
      </div>
    </>
  );
};

export default User;