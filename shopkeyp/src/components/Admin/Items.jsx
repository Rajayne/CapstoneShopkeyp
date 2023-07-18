import React, { useContext, useEffect, useState } from "react";
import ItemsRow from './ItemsRow';
import './Items.css'
import UserContext from '../Hooks/UserContext';
import AdminContext from '../Hooks/AdminContext';
import ShopkeypApi from '../Api/Api';
import { Button } from '@mui/material';

const Items = () => {
  const [user, setUser] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true);

  const authHeader = localStorage.getItem('token')
  const {items} = useContext(AdminContext);
  const [itemData, setItemData] = items;

  useEffect(() => {
    async function getItems() {
      const res = await ShopkeypApi.allItems(authHeader);
      setItemData(await res);
    }
    if (user) {
      getItems();
    }
  }, [authHeader, setItemData, user]);

    useEffect(() => {
    if (itemData) {
      setIsLoading(false);
    }
  }, [itemData])

  if (!isLoading) {
    return (
      <>
        <table className="Items-table">
          <tbody>
          <tr className="Items-title">
            <td className="Items-item">Item</td>
            <td className="Items-description">Description</td>
            <td className="Items-price">Price</td>
            <td className="Items-stock">Stock</td>
            <td className="Items-date">Created</td>
            <td>Edit</td>
          </tr>
          {itemData.map((itemObj) => (
            <tr className="ItemsRow" key={itemObj.itemId}>
              <ItemsRow itemObj={itemObj}/>
            </tr>
          ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default Items;