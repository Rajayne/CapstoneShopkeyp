import React from "react";
import { NavLink } from 'react-router-dom';

const HomeNav = () => {
  return (
    <>
      <NavLink className="HomeNav" to="/">
        <img id="NavBar-icon" src="https://cdn-icons-png.flaticon.com/512/9207/9207223.png" alt=""></img>
        <div id="HomeNav-title">Shopkeyp</div>
      </NavLink>
      {/* <form className="NavBar-search">
        <input id="NavBar-input" type="text" placeholder="Search Shopkeyp"></input>
        <button id="NavBar-button">Search</button>
      </form> */}
    </>
  );
};

export default HomeNav;