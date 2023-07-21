import React, { useContext, useEffect, useState } from "react";
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useFields from '../Hooks/useFields';
import ShopkeypApi from '../Api/Api';
import UserContext from '../Hooks/UserContext';

const UserBalanceForm = () => {
  const navigate = useNavigate();
  const {username} = useParams();
  const [user, setUser] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const authHeader = localStorage.getItem('token')

  const [formData, handleChange, resetFormData] = useFields({
    amount: "",
  });

  useEffect(() => {
    async function getUser(username) {
      const res = await ShopkeypApi.getUser(username, authHeader);
      setUserData(await res);
    }
    if (user) {
      getUser(username);
      setIsLoading(false);
    }
  }, [authHeader, user, username])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ShopkeypApi.updateBalance({
        username: userData.username,
        amount: formData.amount
      }, authHeader);
    } catch (err) {
      console.log(err)
      return;
    }
    resetFormData();
    navigate(`/admin/users/${userData.username}`)
  };

  const validate = () => !Object.values(formData)
  .some((value) => value === 0 || value.length === 0 || value < (-userData.balance));

  if (userData && !isLoading) {
    return (
      <>
        <div className="UserForm-table">
          <form onSubmit={handleSubmit} className="UserForm-form">
          <h4>Update {userData.username}'s Balance</h4>
            <div className="UserForm-amount">
              <label htmlFor="amount" className="UserForm-label">Enter Amount:</label>
              </div>
              <div className="UserForm-amount">
                <input name="amount" id="amount" onChange={handleChange} value={formData.amount} className="UserForm-input" type="number"></input>
              </div>
              <label htmlFor="UserForm-button" className="UserForm-label">New Balance: {userData.balance - (-formData.amount)}gp</label>
              <div className="UserForm-button">
                <Button variant="contained" type="submit" disabled={!validate()}>Submit</Button>
              </div>
          </form>
        </div>
      </>
    );
  };
};

export default UserBalanceForm;