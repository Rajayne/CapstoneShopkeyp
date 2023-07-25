import React, { useContext } from "react";
import UserContext from './Hooks/UserContext';
import './Home.css'

const Home = () => {
  const [user] = useContext(UserContext)
  
  return (
    <>
      <h2>Welcome {user ? `back, ${user.username}` : "Guest"}</h2>
      <div className="Home-intro">
        <p>Shopkeyp is an inventory management system with a static shop.</p>
        <p>Users are able purchase items then view their inventory and purchase history from their profile page.</p>
        <p>Admins are able to add/edit shop items, view user profiles, edit user balances, and view all transaction histories.</p>
        <p>Visitors can <a href="/register">register</a> as a new user or <a href="/login">login</a> using the profiles below:</p>
      </div>
      <div className="Home-login">
        <div className="Home-admin">
          <h4>To view the site as an Admin:</h4>
          <p><b>Username:</b> TestAdmin</p>
          <p><b>Password:</b> password1</p>
        </div>
        <div className="Home-user">
          <h4>To view the site as a User:</h4>
          <b>Username:</b> TestUser 
          <p><b>Password:</b> password2</p>
        </div>
      </div>
    </>
  );
};

export default Home;