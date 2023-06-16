import React from "react";
import Item from './Item'
import { CardContent } from '@mui/material';

const Shop = () => {
  return (
    <CardContent>
      <h1>Shop Page</h1>
      <p>Item List</p>
      <Item/>
    </CardContent>
  );
};

export default Shop;