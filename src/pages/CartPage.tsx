import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../reducers/cartReducer";
import { CartType } from "../types/cart";

const CartPage = () => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const handleRemove = (item: CartType) => {
    dispatch(removeFromCart(item));
  };
  const decreaseItem = (item: CartType) => {
    dispatch(decreaseQuantity(item));
  };
  const increaseItem = (item: CartType) => {
    dispatch(increaseQuantity(item));
  };
  return (
    <div>
      <h1>Cart</h1>
      <p>Your cart has {cart.length} items</p>
      {cart.length === 0 && (
        <div>
          <p>Your cart is empty</p>
          <p>Let's go shopping!!</p>
        </div>
      )}
      {cart.map((item) => {
        return (
          <div key={item.product.id}>
            <Link to={"/products/" + item.product.id}>
              <img src={item.product.images[0]} alt={item.product.title} />
              <h3>{item.product.title}</h3>
            </Link>
            <p>${item.product.price}</p>
            <div>
              <button
                onClick={() => decreaseItem(item)}
                disabled={item.quantity === 1}
              >
                decrease
              </button>
              <span>Quantity: {item.quantity}</span>
              <button onClick={() => increaseItem(item)}>increase</button>
            </div>
            <p>Total Price: ${item.totalPrice}</p>
            <div>
              <button type="submit" onClick={() => handleRemove(item)}>
                Remove
              </button>
            </div>
          </div>
        );
      })}
      <p>
        Total cart: ${cart.reduce((acc, items) => acc + items.totalPrice, 0)}
      </p>
    </div>
  );
};

export default CartPage;
