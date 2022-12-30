import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { fetchAllProducts } from "../reducers/productReducer";

const ProductsListPage = () => {
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
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
              <img src={item.images[0]} alt={item.title} />
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
