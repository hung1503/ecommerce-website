import React from "react";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" />
        <Route path="/product" />
        <Route path="/product/:id" />
        <Route path="/user/" />
        <Route path="/user/:id" />
        <Route path="/cart" />
      </Routes>
    </div>
  );
};

export default App;
