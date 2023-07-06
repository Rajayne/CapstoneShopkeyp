import React, { useContext } from "react";
import { Button, Card, CardContent } from '@mui/material';
import './UserForm.css'
import { useNavigate } from 'react-router-dom';
import useFields from '../Hooks/useFields';
import ShopkeypApi from '../Api/Api';
import UserContext from '../Hooks/UserContext';

const UpdateUserForm = () => {
  const navigate = useNavigate();
  const authHeader = localStorage.getItem('token')
  const [user, setUser] = useContext(UserContext)

  const [formData, handleChange, resetFormData] = useFields({
    profileImage: "",
    password: "",
    retype: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    navigate('/profile')
  }

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
      console.log(err)
      return;
    }
    resetFormData();
    navigate('/profile')
  };

  const validate = () => !Object.values(formData)
  .some((value) => value === 0 || value.length === 0);

  console.log(validate())

  if (user) {
    return (
      <>
        <Card className="UserForm">
        <CardContent className="UserForm-content">
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
            <Button variant="contained" type="submit" disabled={!validate()}>Submit</Button>
            <Button variant="contained" type="button" onClick={handleClick}>Back</Button>
          </div>
        </form>
        </CardContent>
      </Card>
      </>
    );
  }
};

export default UpdateUserForm;