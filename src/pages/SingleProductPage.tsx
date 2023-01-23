import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditProduct from "../components/EditProduct";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addToCart } from "../redux/reducers/cartReducer";
import { displayNoti } from "../redux/reducers/notification";
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
    dispatch(
      displayNoti({
        message: "Item added to your cart!",
        type: "success",
      })
    );
  };

  const handleDelete = (id: number) => {
    dispatch(removeProduct(id));
    nav("/products");
    dispatch(
      displayNoti({
        message: "Item had been removed!",
        type: "success",
      })
    );
  };

  if (!product) return <h2>Loading...</h2>;
  return (
    <div className="singleProduct">
      <div className="singleProduct-route">
        <Link to="/">Home</Link>/<Link to="/products">Products</Link>/
        <Link to={`/products/${id}`}>{product?.title}</Link>
      </div>

      <div className="singleProduct-content">
        <div className="singleProduct-content-img">
          <img src={product?.images[0]} alt={product?.title} />
        </div>
        <div className="singleProduct-content-info">
          <h1>{product?.title}</h1>
          <p>{product?.description}</p>
          <p>
            Price: <span className="price-style">${product?.price}</span>
          </p>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={({ target }) => setQuantity(+target.value)}
          />
          <button
            type="submit"
            className="singleProduct-button"
            onClick={() => handleClick(product)}
          >
            Add to Cart
          </button>
          {isAdmin === "admin" && (
            <div>
              <button
                type="submit"
                className="singleProduct-button"
                onClick={() => handleDelete(product?.id)}
              >
                Delete the product
              </button>
              <button
                type="submit"
                className="singleProduct-button"
                onClick={togglePopUp}
              >
                Edit product
              </button>
            </div>
          )}
          {isOpen && (
            <EditProduct togglePopUp={togglePopUp} product={product} />
          )}
          <p>
            Have a question? <Link to="/contact">Ask us here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
