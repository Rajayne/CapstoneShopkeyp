import React, { useContext, useEffect } from "react";
import { Button } from '@mui/material';
import './RegisterForm.css'
import { useNavigate } from 'react-router-dom';
import useFields from '../Hooks/useFields';
import ShopkeypApi from '../Api/Api';
import UserContext from '../Hooks/UserContext';

const Register = () => {
  const navigate = useNavigate();
  const [user] = useContext(UserContext)

  const [formData, handleChange, resetFormData] = useFields({
    username: "",
    password: "",
    retype: "",
  });

  useEffect(() => {
    if (user) {
      navigate('/profile')
      return;
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.retype) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await ShopkeypApi.register({username: formData.username, password: formData.password});
      alert("New user created successfully!")
    } catch (err) {
      alert("Username not available.")
      console.log(err)
      return;
    }
    resetFormData();
    navigate('/login')
  };

  const validate = () => !Object.values(formData)
  .some((value) => value === 0 || value.length === 0);

  if (!user) {
    return (
      <>
        <h1>Register</h1>
        <p>Create Your Account</p>
          <div className="RegisterForm">
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
          </div>
      </>
    );
  }
};

export default Register;