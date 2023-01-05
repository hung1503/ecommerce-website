import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addToCart } from "../reducers/cartReducer";
import { fetchAllProducts } from "../reducers/productReducer";
import { ProductType } from "../types/product";

const SingleProductPage = () => {
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const product = products.find((item) => item.id === Number(id));
  const handleClick = (item: ProductType) => {
    const itemAddToCart = {
      product: item,
      quantity: quantity,
      totalPrice: item.price * quantity,
    };
    dispatch(addToCart(itemAddToCart));
    console.log(itemAddToCart);
  };
  if (!product) return <h2>Loading...</h2>;
  return (
    <div>
      <Link to="/">Home</Link>/<Link to="/products">Products</Link>/
      <Link to={`/products/${id}`}>{product?.title}</Link>
      <h1>{product?.title}</h1>
      <img src={product?.images[0]} alt={product?.title} />
      <p>{product?.description}</p>
      <h3>${product?.price}</h3>
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={({ target }) => setQuantity(+target.value)}
      />
      <div>
        <button type="submit" onClick={() => handleClick(product)}>
          Add to Cart
        </button>
      </div>
      <p>
        Have a question? <Link to="/contacts">Ask us here</Link>
      </p>
    </div>
  );
};

export default SingleProductPage;
