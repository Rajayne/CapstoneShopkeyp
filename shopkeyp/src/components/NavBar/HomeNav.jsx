import React from "react";
import { NavLink } from 'react-router-dom';

const HomeNav = () => {
  return (
    <>
      <NavLink className="HomeNav NavBar-link" to="/">
        <img id="NavBar-icon" src="https://cdn-icons-png.flaticon.com/512/9207/9207223.png" alt=""></img>
        <div id="HomeNav-title">Shopkeyp</div>
      </NavLink>
    </>
  );
};

export default HomeNav;