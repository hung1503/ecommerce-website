import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { userLogout } from "../../redux/reducers/userReducer";
import avatar from "../../assets/images/avatar.jpg";
const Navbar = () => {
  const cart = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.user.currentUser);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const isLogIn = localStorage.getItem("loggedInUser");
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
          {!isLogIn ? (
            <div>
              <img className="avatar-pic" src={avatar} alt="avatar-pic" />
              <div className="dropdown-content">
                <div>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {user && (
                <img
                  key={user.id}
                  className="avatar-pic"
                  src={user.avatar}
                  alt="user-avatar"
                />
              )}
              <div className="dropdown-content">
                <Link to="/profile">Profile</Link>
                <Link to="/createProduct">Create new product</Link>
                <button type="submit" onClick={() => handleLogOut()}>
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
