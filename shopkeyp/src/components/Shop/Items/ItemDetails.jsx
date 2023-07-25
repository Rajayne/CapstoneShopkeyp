import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ShopkeypApi from '../../Api/Api';
import { Typography } from '@mui/material';
import './ItemDetails.css'
import BackButton from '../../BackButton';
import BuyButton from './BuyButton';

const ItemDetails = () => {
  const {itemId} = useParams();
  const authHeader = localStorage.getItem('token')
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
      async function getItem() {
        const item = await ShopkeypApi.getItem(itemId, authHeader);
        setItemData(item);
      }
      getItem();
  }, [itemId, authHeader]);

  return (
    <>
      <img className="ItemDetails-image" src={itemData.itemImage} alt={itemData.name}/>
      <Typography variant="h5">{itemData.name}</Typography>
      <Typography>Price: {itemData.price}</Typography>
      <Typography>{itemData.stock > 0 ? `Available Stock: ${itemData.stock}` : "Out of Stock" }</Typography>
      <Typography>{itemData.description}</Typography>
      <div className="ItemDetails-button">
        <BackButton/>
        <BuyButton id={itemData.itemId} name={itemData.name} value={itemData.price} stock={itemData.stock}/>
      </div>
    </>
  );
};

export default ItemDetails;