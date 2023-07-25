import React, { useContext, useEffect, useState } from "react";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useFields from '../Hooks/useFields';
import ShopkeypApi from '../Api/Api';
import './UserUpdateForm.css'
import UserContext from '../Hooks/UserContext';
import BackButton from '../BackButton';

const UserUpdateForm = () => {
  const navigate = useNavigate();
  const [user] = useContext(UserContext)
  const authHeader = localStorage.getItem('token')
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getUser(username) {
      const user = await ShopkeypApi.getUser(username, authHeader)
      setUserData(user) 
    }
    if (user) {
      getUser(user.username)
      setIsLoading(false)
    }
  }, [authHeader, user])

  const [formData, handleChange, resetFormData] = useFields({
    profileImage: "",
    password: "",
    retype: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.retype) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await ShopkeypApi.updateUser({username: user.username, profileImage: formData.profileImage, password: formData.password}, authHeader);
      alert("Profile Updated Successfully!")
    } catch (err) {
      alert("Invalid Password.")
      return;
    }
    resetFormData();
    navigate('/profile')
  };

  const validate = () => !Object.values(formData)
  .some((value) => value === 0 || value.length === 0);

  const userPreview = () => {
    if (userData && !formData.profileImage) {
     return userData.profileImage 
    }
    return formData.profileImage
  }

  if (user && !isLoading) {
    return (
      <>
        <div className="UserForm-table">
          <div className="UserForm-left">
            <img className="UserForm-preview" src={userPreview()} alt="Item Preview"></img>
          </div>
          <div className="UserForm-right">
            <form onSubmit={handleSubmit} className="UserForm-form">
              <div className="UserForm-profileImage">
                <label htmlFor="profileImage" className="UserForm-label">Profile Image</label>
               </div>
               <div className="UserForm-profileImage">
                 <input name="profileImage" id="profileImage" onChange={handleChange} value={formData.profileImage} className="UserForm-input" type="text" placeholder="Profile.png"></input>
               </div>
               <div className="UserForm-password">
                 <label htmlFor="password" className="UserForm-label">Password</label>
               </div>
               <div className="UserForm-password">
                 <input name="password" id="password" onChange={handleChange} value={formData.password} className="UserForm-input" type="password" placeholder="********"></input>
               </div>
              <div className="UserForm-retype">
                 <label htmlFor="retype" className="UserForm-label">Retype Password</label>
               </div>
               <div className="UserForm-retype">
                 <input name="retype" id="retype" onChange={handleChange} value={formData.retype} className="UserForm-input" type="password" placeholder="********"></input>
               </div>
               <div className="UserForm-button">
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

export default UserUpdateForm;