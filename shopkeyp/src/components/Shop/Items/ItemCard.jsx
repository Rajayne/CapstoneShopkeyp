import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useContext } from "react";
import './ItemCard.css'
import { useNavigate } from 'react-router-dom';
import ShopkeypApi from '../../Api/Api';
import UserContext from '../../Hooks/UserContext';

const ItemCard = ({itemObj}) => {
  const [user, setUser] = useContext(UserContext);
  const authHeader = localStorage.getItem('token')
  const navigate = useNavigate();
  const handleDetails = (e) => {
    const itemId = e.target.id;
    navigate(`/shop/items/${itemId}`)
  }

  const handlePurchase = async (e) => {
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
    <Card className="ItemCard" sx={{ width: 225}}>
      <CardActionArea>
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
      <CardActions>
        <Button onClick={handleDetails} variant="outlined" id={itemObj.itemId}>Item Details</Button>
        <Button onClick={handlePurchase} variant="contained" id={itemObj.itemId} value={itemObj.price} name={itemObj.name}>Buy</Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;