import { Button } from '@mui/material';
import React, { useContext } from "react";
import './ItemCard.css'
import ShopkeypApi from '../../Api/Api';
import UserContext from '../../Hooks/UserContext';

const BuyButton = ({id, name, value, stock}) => {
  const [user, setUser] = useContext(UserContext);
  const authHeader = localStorage.getItem('token')
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
  };

  return (
    <Button onClick={handlePurchase} variant="contained" disabled={stock === 0 && true}>Buy</Button>
  )
}

export default BuyButton;