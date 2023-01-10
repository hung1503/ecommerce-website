import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditProduct from "../components/editProduct/EditProduct";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addToCart } from "../redux/reducers/cartReducer";
import {
  fetchAllProducts,
  removeProduct,
} from "../redux/reducers/productReducer";
import { ProductType } from "../types/product";

const SingleProductPage = () => {
  const products = useAppSelector((state) => state.products);
  const user = useAppSelector((state) => state.user.currentUser);

  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  let isAdmin;
  if (user) {
    isAdmin = user.role;
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };

  const product = products.find((item) => item.id === Number(id));
  const handleClick = (item: ProductType) => {
    const itemAddToCart = {
      product: item,
      quantity: quantity,
      totalPrice: item.price * quantity,
    };
    dispatch(addToCart(itemAddToCart));
  };

  const handleDelete = (id: number) => {
    dispatch(removeProduct(id));
    nav("/products");
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
      {isAdmin === "admin" && (
        <div>
          <button type="submit" onClick={() => handleDelete(product?.id)}>
            Delete the product
          </button>
          <button type="submit" onClick={togglePopUp}>
            Edit product
          </button>
        </div>
      )}
      {isOpen && <EditProduct togglePopUp={togglePopUp} product={product} />}
      <p>
        Have a question? <Link to="/contacts">Ask us here</Link>
      </p>
    </div>
  );
};

export default SingleProductPage;
