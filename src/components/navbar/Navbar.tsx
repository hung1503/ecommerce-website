import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../../hooks/reduxHook";
const Navbar = () => {
  const cart = useAppSelector((state) => state.cart);
  console.log(cart.length);
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
          {cart.length > 0 && <span className="cartCount">{cart.length}</span>}
        </Link>
        <Link to="/user">User</Link>
      </div>
    </div>
  );
};

export default Navbar;
