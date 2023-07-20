import React, { useEffect, useState, useContext } from "react";
import ShopkeypApi from '../Api/Api';
import './UserProfile.css'
import UserContext from '../Hooks/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import Inventory from '../Users/Inventory';
import jwt_decode from "jwt-decode"
import TransactionsTable from '../Transactions/TransactionsTable';
import { Button } from '@mui/material';
import BackButton from '../BackButton';

const UserProfile = () => {
  const {username} = useParams()
  const authHeader = localStorage.getItem('token')
  const [user, setUser] = useContext(UserContext)
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && authHeader) {
      setUser(jwt_decode(authHeader))
      return;
    }
    if (!user) {
      navigate('/login')
    }
    async function getUser() {
      const res = await ShopkeypApi.getUser(username, authHeader);
      setUserData(await res);
      setIsLoading(false);
    }
    if (user.isAdmin) {
      getUser();
      return;
    }
    navigate('/404')
  }, [authHeader, navigate, setUser, user, username]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  async function handleClick() {
    if (userData.isAdmin === true) {
      console.log("IS ADMIN, call REMOVE")
      const res = await ShopkeypApi.removeAdmin(userData.username, authHeader);
      console.log(res)
      navigate(0);
      return;
    }
    console.log("IS USER, call MAKE")
    const res = await ShopkeypApi.makeAdmin(userData.username, authHeader)
    console.log(res)
    navigate(0);
  }

  // Prevent 1st account's admin status from being removed
  const disable = () => {
    if (userData.userId > 1) {
      return false;
    }
    return true;
  }

  return (
    <>
      <div className="User-profilebar">
        <img className="User-image" src={userData.profileImage} alt=""></img>
        <div className="User-info">
          <h1 className="User-name">{userData.username}'s Profile Page</h1>
          <p>Account Type: {userData.isAdmin ? "Admin" : "User"}</p>
          <p>Balance: {userData.balance}gp</p>
          <div className="UserProfile-buttons">
            <BackButton/>
            <Button variant="contained" onClick={handleClick} disabled={disable()}>Toggle Admin</Button>
          </div>
        </div>
      </div>
      <div className="User-content">
        <div className="User-sections">
          <div className="User-title">{userData.username}'s Inventory</div>
          <div className="User-inventory">
            <Inventory inventory={userData.inventory}/>
          </div>
          <div className="User-title">Transaction History</div>
          <div className="User-transactions">
            <TransactionsTable transactions={userData.transactions}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;