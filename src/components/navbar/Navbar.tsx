import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { userLogout } from "../../reducers/userReducer";

const Navbar = () => {
  const cart = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.users);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(userLogout());
    nav("/login");
  };
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
        <div className="dropdown">
          <p>User</p>
          <div className="dropdown-content">
            {user.length !== 1 ? (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            ) : (
              <div>
                <Link to="/user">Profile</Link>
                <button type="submit" onClick={() => handleLogOut()}>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
