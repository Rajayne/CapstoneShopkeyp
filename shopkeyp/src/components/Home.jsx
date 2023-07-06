import React, { useContext } from "react";
import UserContext from './Hooks/UserContext';

const Home = () => {
  const [user, setUser] = useContext(UserContext)
  
  return (
    <>
      <h2>Welcome {user ? `back, ${user.username}` : "Guest"}</h2>
      <p>Shopkeyp is an inventory management system with a static shop.</p>
      <p>Users are able purchase items and view their inventory or purchase history from their profile page.</p>
      <p>Admins are able to add and edit shop items, view item history, view users, add/remove items from user inventories, add/subtract from user balances, and view all transaction histories.</p> 
    </>
  );
};

export default Home;