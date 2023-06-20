import { Card, CardContent, Typography } from '@mui/material';
import React from "react";

const Transaction = () => {
  return (
    <Card>
      <CardContent>
        <Typography>
          <h1>Transaction ID</h1>
          <p>Transaction Details</p>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Transaction;