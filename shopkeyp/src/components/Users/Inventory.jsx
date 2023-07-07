import React from "react";
import './Inventory.css'
import InventoryItem from './InventoryItem';

const Inventory = ({inventory}) => {
  console.log("INVENTORY", inventory)
  return (
    <>
      <table className="Inventory-table">
        <tr className="Inventory-title">
          <td>Image</td>
          <td>Name</td>
          <td>Quantity</td>
        </tr>
        <tr className="Inventory-item">
        {inventory.map((itemObj) => (
          <InventoryItem itemObj={itemObj}/>
        ))}
        </tr>
      </table>
    </>
  );
};

export default Inventory;