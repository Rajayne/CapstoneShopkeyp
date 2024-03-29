import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from "react";
import './ItemCard.css'
import { NavLink } from 'react-router-dom';
import BuyButton from './BuyButton';
import InfoButton from './InfoButton';

const ItemCard = ({itemObj}) => {

  const visible = () => {
    if (itemObj.stock === 0) {
      return 'none';
    }
    return 'inline-block';
  }

  return (
    <Card className="ItemCard" sx={{ width: 225}} style={{display: visible()}}>
      <CardActionArea component={NavLink} to={`/shop/items/${itemObj.itemId}`}>
      <CardMedia className="ItemCard-image" height="200" component="img" alt={itemObj.name} image={itemObj.itemImage}/>
      <CardContent>
        <Typography variant="h5">
          {itemObj.name}
        </Typography>
        <Typography>
          <b>Price:</b> {itemObj.price}gp
        </Typography>
        <Typography>
          <i>{itemObj.stock >= 0 ? "" : "Out of Stock"}</i>
        </Typography>
      </CardContent>
      </CardActionArea>
      <CardActions className="ItemCard-buttons">
        <InfoButton itemId={itemObj.itemId}/>
        <BuyButton id={itemObj.itemId} name={itemObj.name} value={itemObj.price} stock={itemObj.stock}/>
      </CardActions>
    </Card>
  );
};

export default ItemCard;