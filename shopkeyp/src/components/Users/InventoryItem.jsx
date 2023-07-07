import React, { useEffect, useState } from "react";
import ShopkeypApi from '../Api/Api';

const InventoryItem = ({itemObj}) => {
  console.log("OBJ", itemObj)
  const authHeader = localStorage.getItem('token')
  const [item, setItem] = useState([]);

  useEffect(() => {
      async function getItem() {
        const itemData = await ShopkeypApi.getInventoryItem(itemObj.itemId, authHeader);
        setItem(itemData);
      }
      getItem();
  }, [authHeader, itemObj.itemId]);
  
  return (
    <>
      <td><img className="Inventory-itemImg" src={item.itemImage} alt=""></img></td>
      <td>{item.name}</td>
      <td>{itemObj.quantity}</td>
    </>
  );
};

export default InventoryItem;