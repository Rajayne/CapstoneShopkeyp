import React, { useEffect, useState, useContext } from "react";
import ShopkeypApi from '../Api/Api';
import './User.css'
import UserContext from '../Hooks/UserContext';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const authHeader = localStorage.getItem('token')
  const [user, setUser] = useContext(UserContext)
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [authHeader, user]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <img className="User-image" src={userData.profileImage} alt=""></img>
      <h1 className="User-name">{userData.username}'s Profile Page</h1>
      <p>Balance: {userData.balance}</p>
    </>
  );
};

export default User;