import React from "react";
import { Routes, Route } from "react-router-dom";

import "./assets/styles/main.scss";

import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import ProductsListPage from "./pages/ProductsListPage";
import CartPage from "./pages/CartPage";
import SingleProductPage from "./pages/SingleProductPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsListPage />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/user/" />
        <Route path="/user/:id" />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
