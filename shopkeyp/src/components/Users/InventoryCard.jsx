import React, { useEffect, useState } from "react";
import ShopkeypApi from '../Api/Api';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const InventoryCard = ({itemObj}) => {
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
    <Card className="InventoryCard">
      <CardActionArea component={NavLink} to={`/shop/items/${item.itemId}`}>
        <CardContent className="InventoryCard-content">
          <CardMedia>
            <img className="InventoryCard-itemImg" src={item.itemImage} alt=""></img>
          </CardMedia>
          <Typography>
            x{itemObj.quantity}
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default InventoryCard;