import React from "react";
import ItemsRow from './ItemsRow';
import './Items.css'
const Items = ({items}) => {
  return (
    <>
      <table className="Items-table">
        <tbody>
        <tr className="Items-title">
          <td>ID</td>
          <td>Item</td>
          <td>Description</td>
          <td>Price</td>
          <td>Stock</td>
          <td>Created</td>
        </tr>
        {items.map((itemObj) => (
          <tr className="ItemsRow" key={itemObj.itemId}>
            <ItemsRow itemObj={itemObj}/>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default Items;