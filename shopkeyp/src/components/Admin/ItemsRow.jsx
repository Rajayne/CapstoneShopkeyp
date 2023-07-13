import React from "react";
import Moment from 'moment'
import UpdateButton from './UpdateButton';

const ItemsRow = ({itemObj}) => {
  const date = Moment(itemObj.dateCreated).format('MM-DD-YY')
  
  return (
    <>
      <td className="ItemsRow-item">
        <img className="ItemsRow-itemImg" src={itemObj.itemImage} alt=""></img>
        <div className="ItemsRow-name">{itemObj.name}</div>
      </td>
      <td className="ItemsRow-description">{itemObj.description}</td>
      <td className="ItemsRow-price">{itemObj.price}</td>
      <td>{itemObj.stock}</td>
      <td className="ItemsRow-date">{date}</td>
      <td><UpdateButton itemId={itemObj.itemId}/></td>
    </>
  );
};

export default ItemsRow;