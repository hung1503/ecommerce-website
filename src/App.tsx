import React from "react";
import { Routes, Route } from "react-router-dom";

import "./assets/styles/main.scss";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsListPage from "./pages/ProductsListPage";
import CartPage from "./pages/CartPage";
import SingleProductPage from "./pages/SingleProductPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Profile from "./pages/Profile";
import CreateProductForm from "./pages/CreateProductForm";
import NotiBar from "./components/NotiBar";

const App = () => {
  return (
    <div className="pageContainer">
      <Navbar />
      <NotiBar />
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsListPage />} />
          <Route path="/products/:id" element={<SingleProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createProduct" element={<CreateProductForm />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
