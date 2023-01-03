import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Navbar = () => {
  return (
    <div className="navbarContainer">
      <div className="navbar-leftSec">
        <span className="navbarLogo">Logo</span>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="navbar-rightSec">
        <Link to="/cart">
          <ShoppingCartIcon />
        </Link>
        <Link to="/user">User</Link>
      </div>
    </div>
  );
};

export default Navbar;
