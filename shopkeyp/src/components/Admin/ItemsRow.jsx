import React from "react";
import Moment from 'moment'
import UpdateButton from './UpdateButton';
import { useNavigate } from 'react-router-dom';

const ItemsRow = ({itemObj}) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/shop/items/${e.target.id}`)
  }
  const date = Moment(itemObj.dateCreated).format('MM-DD-YY')
  
  return (
    <>
      <td onClick={handleClick} id={itemObj.itemId} className="ItemsRow-item">
        <img className="ItemsRow-itemImg" id={itemObj.itemId} src={itemObj.itemImage} alt=""></img>
        <span className="ItemsRow-name" id={itemObj.itemId}>{itemObj.name}</span>
      </td>
      <td className="ItemsRow-description">{itemObj.description}</td>
      <td className="ItemsRow-price">{itemObj.price}</td>
      <td className="ItemsRow-stock">{itemObj.stock}</td>
      <td className="ItemsRow-date">{date}</td>
      <td><UpdateButton className="ItemsRow-button" itemId={itemObj.itemId}/></td>
    </>
  );
};

export default ItemsRow;