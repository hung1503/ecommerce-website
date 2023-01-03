import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";

const ProductsListPage = () => {
  const products = useAppSelector((state) => state.products);
  return (
    <div>
      <h1>Products</h1>
      <Link to="/">Home</Link>/<Link to="/products">Products</Link>
      {!products ? (
        <h2>Loading...</h2>
      ) : (
        products.map((item) => {
          return (
            <div key={item.id}>
              <Link to={"/products/" + item.id}>
                <img src={item.images[0]} alt={item.title} />
              </Link>
              <p>{item.title}</p>
              <h3>${item.price}</h3>
              <button type="submit">Add to Cart</button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProductsListPage;
