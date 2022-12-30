import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { fetchLimitedProducts } from "../../reducers/limitedProductReducer";

const Carousel = () => {
  const limitedProducts = useAppSelector((state) => state.limitedProducts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLimitedProducts());
  }, [dispatch]);
  return (
    <div>
      {limitedProducts.map((product) => {
        return (
          <div key={product.id}>
            <Link to={"/products/" + product.id}>
              <img src={product.images[0]} alt={product.title} />
            </Link>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button type="submit">
              <AddShoppingCartIcon /> Add To Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
