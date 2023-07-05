import React, { useEffect, useState } from "react";
import ShopkeypApi from './Api/Api';
import './Shop.css'
import { Button, Tooltip } from '@mui/material';

const Shop = () => {
  const authHeader = localStorage.getItem('token')
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      const allItems = await ShopkeypApi.getShop(authHeader);
      setItems(allItems);
      setIsLoading(false);
    }
    getItems();
  }, [authHeader]);

  if (isLoading) {
    return <p>Loading</p>;
  }
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
              <td>{item.stock}</td>
              <td>
                <button className="Shop-button">Buy</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Shop;