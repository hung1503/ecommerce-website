import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import "./assets/styles/main.scss";
import ProductsListPage from "./pages/ProductsListPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsListPage />} />
        <Route path="/products/:id" />
        <Route path="/user/" />
        <Route path="/user/:id" />
        <Route path="/cart" />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
