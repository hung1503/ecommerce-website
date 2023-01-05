import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addToCart } from "../reducers/cartReducer";
import { ProductType } from "../types/product";

const ProductsListPage = () => {
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const handleAddtoCart = (product: ProductType) => {
    dispatch(
      addToCart({
        product: product,
        quantity: 1,
        totalPrice: product.price,
      })
    );
  };
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
              <button type="submit" onClick={() => handleAddtoCart(item)}>
                Add to Cart
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProductsListPage;
