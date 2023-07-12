import { Card, CardContent, Typography } from '@mui/material';
import React from "react";

const Transaction = () => {
  return (
    <table>
      <tr>
        <td>ID</td>
        <td>Type</td>
        <td>Item</td>
        <td>Quantity</td>
        <td>Total</td>
      </tr>
    </table>
  );
};

export default Transaction;