import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { fetchAllProducts } from "../../reducers/productReducer";
import { ProductType } from "../../types/product";
import { addToCart } from "../../reducers/cartReducer";

const Carousel = () => {
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

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
      {products.slice(40, 50).map((product) => {
        return (
          <div key={product.id}>
            <Link to={"/products/" + product.id}>
              <img src={product.images[0]} alt={product.title} />
            </Link>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button type="submit" onClick={() => handleAddtoCart(product)}>
              <AddShoppingCartIcon /> Add To Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
