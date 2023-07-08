import React, { useContext, useEffect, useState } from "react";
import ShopkeypApi from './Api/Api';
import './Shop.css'
import { Button, Tooltip } from '@mui/material';
import UserContext from './Hooks/UserContext';
import { useNavigate } from 'react-router-dom';
import ItemCard from './Items/ItemCard';

const Shop = () => {
  const [user, setUser] = useContext(UserContext);
  const authHeader = localStorage.getItem('token')
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("Please register or login to view this page.")
      navigate('/login')
    }
  })

  useEffect(() => {
    if (user) {
      async function getItems() {
        const allItems = await ShopkeypApi.getShop(authHeader);
        setItems(allItems);
        setIsLoading(false);
      }
      getItems();
    }
  }, [user, authHeader]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const data = {
      toUser: user.username,
      itemId: e.target.id,
      quantity: 1,
      total: e.target.value,
    }
      const res = await ShopkeypApi.buyItem(data, authHeader)
      if (res.message) {
        const error = JSON.stringify(res.message)
        alert(JSON.parse(error))
        return;
      }
      alert(`You have successfully purchased ${data.quantity} ${e.target.name}(s).`)
  };
  return (
    <div>
      <h1>Shop Page</h1>
      <div className="Shop-items">
        {items.map((itemObj) => (
          <ItemCard key={itemObj.itemId} itemObj={itemObj} className="Shop-item" />
        ))}
      </div>
    </div>
  );
};

export default Shop;