import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { fetchAllProducts } from "../../redux/reducers/productReducer";
import { ProductType } from "../../types/product";
import { addToCart } from "../../redux/reducers/cartReducer";

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
    <div className="carouselContainer">
      <h2>Popular products</h2>
      <div className="carouselSection">
        {products.slice(40, 50).map((product) => {
          return (
            <div key={product.id} className="carouselProduct">
              <Link to={"/products/" + product.id}>
                <div className="carouselProduct-img">
                  <img src={product.images[0]} alt={product.title} />
                </div>
              </Link>
              <div className="carouselProduct-content">
                <p className="carouselProduct-title">{product.title}</p>
                <p className="carouselProduct-price">${product.price}</p>
              </div>
              <div className="carouselProduct-btn">
                <button type="submit" onClick={() => handleAddtoCart(product)}>
                  <AddShoppingCartIcon /> Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
