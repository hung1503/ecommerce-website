import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div>
        <Link to="/cart">Cart</Link>
        <Link to="/user">User</Link>
      </div>
    </div>
  );
};

export default Navbar;
