import React from "react";
import { Button, Card, CardContent } from '@mui/material';
import './LoginForm.css'

const LoginForm = () => {
  return (
    <Card className="LoginForm">
      <CardContent className="LoginForm-form">
      <form>
        <div className="LoginForm-username">
          <label for="username" className="LoginForm-label">Username</label>
        </div>
        <div className="LoginForm-username">
          <input name="username" id="username" className="LoginForm-input" type="text" placeholder="Shopkeyp"></input>
        </div>
        <div className="LoginForm-password">
          <label for="password" className="LoginForm-label">Password</label>
        </div>
        <div className="LoginForm-password">
          <input name="password" id="password" className="LoginForm-input" type="password" placeholder="********"></input>
        </div>
        <div className="LoginForm-button">
          <Button variant="contained">Submit</Button>
        </div>
      </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;