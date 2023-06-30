import { Card, CardContent, Typography } from '@mui/material';
import React from "react";
import { NavLink } from 'react-router-dom';

const Item = () => {
  return (
    <Card>
      <CardContent>
        <Typography>
          <h1>Item Title</h1>
          <p>Item Description</p>
          <NavLink>More Info</NavLink>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Item;