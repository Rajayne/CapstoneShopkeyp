import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from "react";
import './ItemCard.css'
import ShopkeypApi from '../../Api/Api';
import UserContext from '../../Hooks/UserContext';
import { useNavigate } from 'react-router-dom';

const BuyButton = ({id, name, value, stock}) => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [disable, setDisable] = useState(false);
  const authHeader = localStorage.getItem('token')

  useEffect(() => {
  async function isVisible() {
    const userData = await ShopkeypApi.getUser(user.username, authHeader)
    if (userData.active === false || stock === 0) {
      setDisable(true)
    }
  }
    isVisible();
  }, [authHeader, stock, user.username])
  
  const handlePurchase = async (e) => {
    const data = {
      toUser: user.username,
      itemId: id,
      quantity: 1,
      total: value,
    }
    const res = await ShopkeypApi.buyItem(data, authHeader)
    if (res.message) {
      const error = JSON.stringify(res.message)
      alert(JSON.parse(error))
      return;
    }
    alert(`You have successfully purchased ${data.quantity} ${name}(s).`)
    navigate(0)
  };

  return (
    <Button onClick={handlePurchase} variant="contained" disabled={disable}>Buy</Button>
  )
}

export default BuyButton;