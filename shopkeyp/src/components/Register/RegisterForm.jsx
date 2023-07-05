import React, { useContext } from "react";
import { Button, Card, CardContent } from '@mui/material';
import './RegisterForm.css'
import { useNavigate } from 'react-router-dom';
import useFields from '../Hooks/useFields';
import ShopkeypApi from '../Api/Api';
import UserContext from '../Hooks/UserContext';

const NewRegisterForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext)

  const [formData, handleChange, resetFormData] = useFields({
    username: "",
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
      const res = await ShopkeypApi.register({username: formData.username, password: formData.password});
      alert("New user created successfully!")
      localStorage.setItem("token", res.token)
      setUser(formData.username)
    } catch (err) {
      alert("Username not available.")
      console.log(err)
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