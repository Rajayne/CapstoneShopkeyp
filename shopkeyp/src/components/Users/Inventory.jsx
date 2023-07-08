import React from "react";
import './Inventory.css'
import InventoryItem from './InventoryItem';

const Inventory = ({inventory}) => {
  console.log("INVENTORY", inventory)
  return (
    <>
      <table className="Inventory-table">
        <tbody>
        <tr className="Inventory-title">
          <td>Image</td>
          <td>Name</td>
          <td>Quantity</td>
        </tr>
        {inventory.map((itemObj) => (
          <tr className="Inventory-item" key={itemObj.itemId}>
            <InventoryItem itemObj={itemObj}/>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default Inventory;