import React,  { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent } from '@mui/material';
import './LoginForm.css'
import useFields from '../Hooks/useFields';

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, handleChange, resetFormData] = useFields({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    resetFormData();
    navigate('/profile')
  };

  const validate = () => !Object.values(formData)
  .some((value) => value === 0 || value.length === 0);

  return (
    <Card className="LoginForm">
      <CardContent className="LoginForm-content">
      <form className="LoginForm-form" onSubmit={handleSubmit}>
        <div className="LoginForm-username">
          <label htmlFor="username" className="LoginForm-label">Username</label>
        </div>
        <div className="LoginForm-username">
          <input name="username" id="username" onChange={handleChange} value={formData.username} className="LoginForm-input" type="text" placeholder="Shopkeyp"></input>
        </div>
        <div className="LoginForm-password">
          <label htmlFor="password" className="LoginForm-label">Password</label>
        </div>
        <div className="LoginForm-password">
          <input name="password" id="password" onChange={handleChange} value={formData.password} className="LoginForm-input" type="password" placeholder="********"></input>
        </div>
        <div className="LoginForm-button">
          <Button variant="contained" type="submit" disabled={!validate()}>Submit</Button>
        </div>
      </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;