import React from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar-links">
      <Link className="link" to="/">
        Home
      </Link>
    </nav>
  );
};

export default NavBar;