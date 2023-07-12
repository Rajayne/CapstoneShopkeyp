import React from "react";
import './Inventory.css'
import InventoryCard from './InventoryCard';

const Inventory = ({inventory}) => {
  if (inventory.length) {
    return (
      <>
        {inventory.map((itemObj) => (
          <div className="InventoryCard" key={itemObj.itemId}>
            <InventoryCard itemObj={itemObj}/>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        <div>N/A</div>
      </>
    )
  }
}

export default Inventory;