import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { fetchAllProducts } from "../reducers/productReducer";

const SingleProductPage = () => {
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  if (!product) return <h2>Loading...</h2>;
  return (
    <div>
      <Link to="/">Home</Link>/<Link to="/products">Products</Link>/
      <Link to={`/products/${id}`}>{product?.title}</Link>
      <h1>{product?.title}</h1>
      <img src={product?.images[0]} alt={product?.title} />
      <p>{product?.description}</p>
      <h3>${product?.price}</h3>
      <button type="submit">Add to Cart</button>
      <p>
        Have a question? <Link to="/contacts">Ask us here</Link>
      </p>
    </div>
  );
};

export default SingleProductPage;
