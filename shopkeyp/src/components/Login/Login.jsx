import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './Login.css'
import useFields from '../Hooks/useFields';
import ShopkeypApi from '../Api/Api';
import jwt_decode from "jwt-decode"
import { useContext, useEffect } from 'react';
import UserContext from '../Hooks/UserContext';

const Login = () => {
  const [user, setUser] = useContext(UserContext)
  const navigate = useNavigate();

  const [formData, handleChange, resetFormData] = useFields({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate('/profile')
      return;
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await ShopkeypApi.login({username: formData.username, password: formData.password});
      setUser(jwt_decode(res.token))
      alert('Successfully logged in!')
      localStorage.setItem("token", res.token)
    } catch (err) {
      alert('Invalid username/password.')
      return;
    }
    resetFormData();
    navigate('/profile')
  };

  const validate = () => !Object.values(formData)
  .some((value) => value === 0 || value.length === 0);

  if (!user) {
    return (
      <>
        <h1>Login Page</h1>
        <p>Please Sign In</p>
        <div className="LoginForm">
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
        </div>
      </>
    );
  }
};

export default Login;