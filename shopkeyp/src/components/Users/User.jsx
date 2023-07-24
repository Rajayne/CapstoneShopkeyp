import React, { useEffect, useState, useContext } from "react";
import ShopkeypApi from '../Api/Api';
import './User.css'
import UserContext from '../Hooks/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import Inventory from './Inventory';
import jwt_decode from "jwt-decode"
import TransactionsTable from '../Transactions/TransactionsTable';
import UserUpdateForm from './UserUpdateForm';
import { Button } from '@mui/material';

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
      case "edit": return <UserUpdateForm />;
      default: return (
        <div className="User-sections">
        <div className="User-title">{userData.username}'s Inventory</div>
        <div className="User-inventory">
          <Inventory inventory={userData.inventory}/>
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

  async function toggleActive() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Press OK to ${userData.active === true ? "deactivate" : "re-activate"} ${userData.username}'s account or Cancel to abort.`) === true) {
      alert(`Your account status has successfully changed to ${userData.active === true ? "inactive" : "active"}`)
      if (userData.active === true) {
        console.log("DEACTIVATE", userData.username)
        try {
          await ShopkeypApi.deactivateUser(userData.username, authHeader)
        } catch (e) {
          console.log(e)
        }
      } else {
        console.log("REACTIVATE", userData.username)
        await ShopkeypApi.reactivateUser(userData.username, authHeader)
      }
      navigate(0)
    } else {
      alert(`You have cancelled any changes to your account status.`);
    }
  }

  const activeButton = () => {
    if (userData.active === true) {
      return <Button color="info" variant="text" onClick={toggleActive}>Active</Button>
    } else {
      return <Button color="error" variant="text" onClick={toggleActive}>Inactive</Button>
    }  
  }

  return (
    <>
      <div className="User-profilebar">
        <img className="User-image" src={userData.profileImage} alt=""></img>
        <div className="User-info">
          <h1 className="User-name">{userData.username}'s Profile Page</h1>
          <p>Balance: {userData.balance}gp</p>
          <p>Acount Status: {activeButton()}</p>
          <Button variant="outlined" onClick={handleClick}>Edit Profile</Button>
        </div>
      </div>
      <div className="User-content">
        {currentTab()}
      </div>
    </>
  );
};

export default User;