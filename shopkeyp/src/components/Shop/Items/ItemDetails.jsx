import React from "react";
import { useParams } from 'react-router-dom';
const ItemDetails = () => {
  const {itemId} = useParams();
  console.log(itemId)
  return (
    <>
      <h1>Item Page</h1>
      <p>Item Details</p>
    </>
  );
};

export default ItemDetails;