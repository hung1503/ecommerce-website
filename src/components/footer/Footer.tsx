import React from "react";
import { Link } from "react-router-dom";
import {
  Twitter,
  Instagram,
  YouTube,
  Pinterest,
  Facebook,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer">
      <div className="promo">
        <p>BECOME A MEMBER & GET 30% OFF YOUR FIRST ORDER</p>
        <button>JOIN NOW</button>
      </div>
      <div className="footer-links">
        <div className="footer-navbar">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com/">
            <Facebook />
          </a>
          <a href="https://twitter.com/">
            <Twitter />
          </a>
          <a href="https://www.youtube.com/">
            <YouTube />
          </a>
          <a href="https://www.pinterest.com/">
            <Pinterest />
          </a>
          <a href="https://www.instagram.com/">
            <Instagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
