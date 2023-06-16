import { Card, CardContent, Typography } from '@mui/material';
import React from "react";

const Item = () => {
  return (
    <Card>
      <CardContent>
        <Typography>
          <h1>Item Title</h1>
          <p>Item Details</p>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Item;