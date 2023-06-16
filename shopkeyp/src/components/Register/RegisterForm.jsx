import React from "react";
import { Button, Card, CardContent } from '@mui/material';
import './RegisterForm.css'

const RegisterForm = () => {
  return (
    <Card className="RegisterForm">
      <CardContent className="RegisterForm-form">
      <form>
        <div className="RegisterForm-username">
          <label for="username" className="RegisterForm-label">Username</label>
        </div>
        <div className="RegisterForm-username">
          <input name="username" id="username" className="RegisterForm-input" type="text" placeholder="Shopkeyp"></input>
        </div>
        <div className="RegisterForm-password">
          <label for="password" className="RegisterForm-label">Password</label>
        </div>
        <div className="RegisterForm-password">
          <input name="password" id="password" className="RegisterForm-input" type="password" placeholder="********"></input>
        </div>
        <div className="RegisterForm-retype">
          <label for="password" className="RegisterForm-label">Retype Password</label>
        </div>
        <div className="RegisterForm-retype">
          <input name="password" id="password" className="RegisterForm-input" type="password" placeholder="********"></input>
        </div>
        <div className="RegisterForm-button">
          <Button variant="contained">Submit</Button>
        </div>
      </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;