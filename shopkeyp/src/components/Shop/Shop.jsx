import React, { useContext, useEffect, useState } from "react";
import ShopkeypApi from '../Api/Api';
import './Shop.css'
import UserContext from '../Hooks/UserContext';
import { useNavigate } from 'react-router-dom';
import ItemCard from './Items/ItemCard';

const Shop = () => {
  const [user] = useContext(UserContext);
  const authHeader = localStorage.getItem('token')
  const [userBalance, setUserBalance] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authHeader) {
      alert("Please register or login to view this page.")
      navigate('/login')
    }
  })

  useEffect(() => {
      async function getItems() {
        const allItems = await ShopkeypApi.getShop(authHeader);
        setItems(allItems);
      }
      async function getUser(username) {
        const userObj = await ShopkeypApi.getUser(username, authHeader);
        setUserBalance(userObj.balance);
      }
      if (user) {
        getItems();
        getUser(user.username)
      }
  }, [user, authHeader]);

  useEffect(() => {
    if (userBalance && items) {
      setIsLoading(false);
    }
  }, [userBalance, items]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="Shop">
      <div className="Shop-balance"><b>{user.username}'s Balance: </b> {userBalance}gp</div>
      <div className="Shop-container">
        {items.map((itemObj) => (
          <ItemCard key={itemObj.itemId} itemObj={itemObj} className="Shop-item" />
        ))}
      </div>
    </div>
  );
};

export default Shop;