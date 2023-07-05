import React, { useContext } from "react";
import UserContext from './Hooks/UserContext';

const Home = () => {
  const [user, setUser] = useContext(UserContext)
  return (
    <>
      <h1>Home Page</h1>
      <p>Welcome {user ? `back, ${user}` : "Guest"}</p>
      <p>About Us</p>
    </>
  );
};

export default Home;