import React, { useContext, useEffect } from "react";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useFields from '../Hooks/useFields';
import ShopkeypApi from '../Api/Api';
import './ItemUpdate.css'
import BackButton from '../BackButton';
import UserContext from '../Hooks/UserContext';
import Moment from 'moment'

const ItemNewForm = () => {
  const [user] = useContext(UserContext)
  const navigate = useNavigate();
  const authHeader = localStorage.getItem('token')

  useEffect(() => {
    if (!authHeader) {
      navigate('/login')
    }
    if (user) {
      if (user.isAdmin === false) {
        navigate('/404')
      }
    }
  }, [authHeader, navigate, user])

  const [formData, handleChange, resetFormData] = useFields({
    itemImage: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    purchasable: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ShopkeypApi.addItem({
        itemImage: formData.itemImage, 
        name: formData.name, 
        description: formData.description,
        price: JSON.parse(formData.price),
        stock: JSON.parse(formData.stock),
        purchasable: JSON.parse(formData.purchasable),
        dateCreated: Moment().format("YYYY-MM-DD HH:MM:SS")
      }, authHeader);
      alert("Item Updated Successfully!")
    } catch (err) {
      console.log(err)
      return;
    }
    resetFormData();
    navigate('/admin/items')
  };

  const validate = () => !Object.values(formData)
  .some((value) => value === 0 || value.length === 0);

  const itemPreview = () => {
    if (!formData.itemImage) {
      return "https://tabletop.events/tte1/img/merchplaceholder.png"
    }
    return formData.itemImage
  }
  
  return (
    <>
      <div className="ItemForm-table">
        <div className="ItemForm-left">
          <img className="ItemForm-preview" src={itemPreview()} alt="Item Preview"></img>
        </div>
        <div className="ItemForm-right">
          <form onSubmit={handleSubmit} className="ItemForm-form">
            <div className="ItemForm-itemImage">
              <label htmlFor="itemImage" className="ItemForm-label">Item Image</label>
            </div>
            <div className="ItemForm-itemImage">
              <input name="itemImage" id="itemImage" onChange={handleChange} value={formData.itemImage} className="ItemForm-input" type="text" placeholder="Item.png"></input>
            </div>
            <div className="ItemForm-name">
              <label htmlFor="name" className="ItemForm-label">Item Name</label>
            </div>
            <div className="ItemForm-name">
              <input name="name" id="name" onChange={handleChange} value={formData.name} className="ItemForm-input" type="text" placeholder="Item Name"></input>
            </div>
            <div className="ItemForm-description">
              <label htmlFor="description" className="ItemForm-label">Item Description</label>
            </div>
            <div className="ItemForm-description">
              <textarea name="description" id="description" onChange={handleChange} value={formData.description} className="ItemForm-input"  placeholder="Item Description" style={{resize: 'none', fontFamily: 'Arial'}}></textarea>
            </div>
            <div className="ItemForm-price">
              <label htmlFor="price" className="ItemForm-label">Item Price</label>
            </div>
            <div className="ItemForm-price">
              <input name="price" id="price" onChange={handleChange} value={formData.price} className="ItemForm-input" placeholder="Item Price" type="number"></input>
            </div>
            <div className="ItemForm-stock">
              <label htmlFor="stock" className="ItemForm-label">Item Stock</label>
            </div>
            <div className="ItemForm-price">
              <input name="stock" id="stock" onChange={handleChange} value={formData.stock} className="ItemForm-input" placeholder="Item Stock" type="number"></input>
            </div>
            <div className="ItemForm-purchasable">
              <label htmlFor="purchasable" className="ItemForm-label">Purchasable</label>
            </div>
            <select name="purchasable" id="purchasable" onChange={handleChange} className="ItemForm-input" value={formData.purchasable}>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <div className="ItemForm-button">
              <BackButton />
              <Button variant="contained" type="submit" disabled={!validate()}>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ItemNewForm;