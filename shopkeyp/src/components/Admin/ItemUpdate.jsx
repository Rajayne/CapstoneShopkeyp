import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useFields from '../Hooks/useFields';
import ShopkeypApi from '../Api/Api';
import './ItemUpdate.css'
import BackButton from '../BackButton';

const ItemUpdateForm = () => {
  const {itemId} = useParams();
  const navigate = useNavigate();
  const authHeader = localStorage.getItem('token')
  const [itemData, setItemData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getItem(itemId) {
      const res = await ShopkeypApi.getItem(itemId, authHeader);
      setItemData(await res);
    }
    getItem(itemId);
  }, [authHeader, itemId]);

  useEffect(() => {
    if (itemData) {
      setIsLoading(false)
    }
  }, [itemData]);

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
      // await ShopkeypApi.updateItem({username: user.username, profileImage: formData.profileImage, password: formData.password}, authHeader);
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
      return itemData.itemImage
    }
    return formData.itemImage
  }

  if (!isLoading) {
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
                <input name="itemImage" id="itemImage" onChange={handleChange} value={formData.itemImage} className="ItemForm-input" type="text" placeholder={itemData.itemImage}></input>
              </div>
              <div className="ItemForm-name">
                <label htmlFor="name" className="ItemForm-label">Item Name</label>
              </div>
              <div className="ItemForm-name">
                <input name="name" id="name" onChange={handleChange} value={formData.name} className="ItemForm-input" type="text" placeholder={itemData.name}></input>
              </div>
              <div className="ItemForm-description">
                <label htmlFor="description" className="ItemForm-label">Item Description</label>
              </div>
              <div className="ItemForm-description">
                <textarea name="description" id="description" onChange={handleChange} value={formData.description} className="ItemForm-input"  placeholder={itemData.description} style={{resize: 'none', fontFamily: 'Arial'}}></textarea>
              </div>
              <div className="ItemForm-price">
                <label htmlFor="price" className="ItemForm-label">Item Price</label>
              </div>
              <div className="ItemForm-price">
                <input name="price" id="price" onChange={handleChange} value={formData.price} className="ItemForm-input" placeholder={itemData.price} type="number"></input>
              </div>
              <div className="ItemForm-stock">
                <label htmlFor="stock" className="ItemForm-label">Item Stock</label>
              </div>
              <div className="ItemForm-price">
                <input name="stock" id="stock" onChange={handleChange} value={formData.stock} className="ItemForm-input" placeholder={itemData.stock} type="number"></input>
              </div>
              <div className="ItemForm-purchasable">
                <label htmlFor="purchasable" className="ItemForm-label">Purchasable</label>
              </div>
              <select name="purchasable" id="purchasable" onChange={handleChange} className="ItemForm-input" placeholder={itemData.purchasable} value={formData.purchasable}>
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
};

export default ItemUpdateForm;