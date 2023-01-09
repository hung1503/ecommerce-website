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
    <footer className="footerSection">
      <div className="footerSection-promo">
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
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <Facebook />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer">
            <Twitter />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            <YouTube />
          </a>
          <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
            <Pinterest />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <Instagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
