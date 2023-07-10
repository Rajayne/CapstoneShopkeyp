import React from "react";
import Moment from 'moment'

const ItemsRow = ({itemObj}) => {
  console.log(itemObj)

  const date = Moment(itemObj.dateCreated).format('MM-DD-YYYY')
  
  return (
    <>
      <td>{itemObj.itemId}</td>
      <td className="ItemRow-item">
        <img className="ItemsRow-itemImg" src={itemObj.itemImage} alt=""></img>
        <div className="ItemsRow-name">{itemObj.name}</div>
      </td>
      <td>{itemObj.description}</td>
      <td>{itemObj.price}</td>
      <td>{itemObj.stock}</td>
      <td>{date}</td>
    </>
  );
};

export default ItemsRow;