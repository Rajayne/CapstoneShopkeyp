import React, { useState } from "react";
import { Button, Card, CardContent } from '@mui/material';
import './RegisterForm.css'
import { useNavigate, useParams } from 'react-router-dom';
import useFields from '../Hooks/useFields';

const NewRegisterForm = () => {
  const navigate = useNavigate();

  const [formData, handleChange, resetFormData] = useFields({
    username: "",
    password: "",
    retype: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.retype) {
      alert("Passwords do not match!");
      return;
    }
    resetFormData();
    navigate('/profile')
  };

  const validate = () => !Object.values(formData)
  .some((value) => value === 0 || value.length === 0);

  return (
    <Card className="RegisterForm">
      <CardContent className="RegisterForm-content">
      <form onSubmit={handleSubmit} className="RegisterForm-form">
        <div className="RegisterForm-username">
          <label htmlFor="username" className="RegisterForm-label">Username</label>
        </div>
        <div className="RegisterForm-username">
          <input name="username" id="username" onChange={handleChange} value={formData.username} className="RegisterForm-input" type="text" placeholder="Shopkeyp"></input>
        </div>
        <div className="RegisterForm-password">
          <label htmlFor="password" className="RegisterForm-label">Password</label>
        </div>
        <div className="RegisterForm-password">
          <input name="password" id="password" onChange={handleChange} value={formData.password} className="RegisterForm-input" type="password" placeholder="********"></input>
        </div>
        <div className="RegisterForm-retype">
          <label htmlFor="retype" className="RegisterForm-label">Retype Password</label>
        </div>
        <div className="RegisterForm-retype">
          <input name="retype" id="retype" onChange={handleChange} value={formData.retype} className="RegisterForm-input" type="password" placeholder="********"></input>
        </div>
        <div className="RegisterForm-button">
          <Button variant="contained" type="submit" disabled={!validate()}>Submit</Button>
        </div>
      </form>
      </CardContent>
    </Card>
  );
};

export default NewRegisterForm;