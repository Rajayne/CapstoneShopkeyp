import React, { useContext, useEffect, useState } from "react";
import ShopkeypApi from './Api/Api';
import './Shop.css'
import { Button, Tooltip } from '@mui/material';
import UserContext from './Hooks/UserContext';
import { useNavigate } from 'react-router-dom';

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
    <>
      <h1>Shop Page</h1>
      <table className="Shop-table">
        <tbody className="Shop-body">
          <tr className="Shop-title">
            <td>Image</td>
            <td>Name</td>
            <td>Price</td>
            <td>Stock</td>
            <td>Purchase</td>
          </tr>
          {items.map((item) => (
            <tr key={item.itemId} className="Shop-item">
              <td><img className="Shop-itemImg" src={item.itemImage} alt=""></img></td>
              <td>
                <Tooltip title={item.description}>
                  <Button>{item.name}</Button>
                </Tooltip>
              </td>
              <td>{item.price}</td>
              <td>{item.stock > 0 ? item.stock : "Out of Stock"}</td>
              <td>
                <button id={item.itemId} name={item.name} value={item.price} disabled={item.stock === 0 ? true : false} className="Shop-button" onClick={handleClick}>Buy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Shop;