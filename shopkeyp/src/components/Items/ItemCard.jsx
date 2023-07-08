import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from "react";
import './ItemCard.css'
import { useNavigate } from 'react-router-dom';

const ItemCard = ({itemObj}) => {
  const navigate = useNavigate();
  const handleDetails = (e) => {
    const itemId = e.target.id;
    navigate(`/shop/items/${itemId}`)
  }

  return (
    <Card className="ItemCard" sx={{ width: 225, height: 350}}>
      <CardActionArea>
      <CardMedia className="ItemCard-image" height="200" component="img" alt={itemObj.name} image={itemObj.itemImage}/>
      <CardContent>
        <Typography variant="h5">
          {itemObj.name}
        </Typography>
        <Typography>
          <b>Price:</b> {itemObj.price}gp
        </Typography>
      </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleDetails} variant="outlined" id={itemObj.itemId}>Item Details</Button>
        <Button variant="contained">Buy</Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;