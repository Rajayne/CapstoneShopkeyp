import React, { useEffect, useState, useContext } from "react";
import ShopkeypApi from '../Api/Api';
import './User.css'
import UserContext from '../Hooks/UserContext';

const User = () => {
  const authHeader = localStorage.getItem('token')
  const [user, setUser] = useContext(UserContext)
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const res = await ShopkeypApi.getUser(user, authHeader);
      setUserData(await res);
      setIsLoading(false);
    }
    getUser();
  }, [authHeader, user]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  console.log(user)
  return (
    <>
      <img className="User-image" src={userData.profileImage} alt=""></img>
      <h1 className="User-name">{userData.username}'s Profile Page</h1>
      <p>Balance: {userData.balance}</p>
    </>
  );
};

export default User;