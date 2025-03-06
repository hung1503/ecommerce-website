import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/reducers/cartReducer";
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
  const totalPrice = cart.reduce((acc, items) => acc + items.totalPrice, 0);
  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      <div className="cart-section">
        <table className="cart-table-items">
          {cart.length > 0 ? (
            <thead>
              <tr>
                <th>Item</th>
                <th></th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
          ) : (
            <div style={{ margin: "" }}>
              <h2>Your cart is empty</h2>
              <p>
                Let's go <Link to="/">shopping!!</Link>
              </p>
            </div>
          )}
          {cart.map((item) => {
            return (
              <tbody className="cart-tbody" key={item.product.id}>
                <tr>
                  <td>
                    <Link to={"/products/" + item.product.id}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                      />
                    </Link>
                  </td>
                  <td>
                    <h3>{item.product.title}</h3>
                  </td>
                  <td>
                    <p>${item.product.price}</p>
                  </td>
                  <td>
                    <div>
                      <button
                        className="cart-tbody-btn"
                        onClick={() => decreaseItem(item)}
                        disabled={item.quantity === 1}
                      >
                        <RemoveIcon />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="cart-tbody-btn"
                        onClick={() => increaseItem(item)}
                      >
                        <AddIcon />
                      </button>
                    </div>
                  </td>
                  <td>
                    <p>${item.totalPrice}</p>
                  </td>
                  <td>
                    <button
                      className="cart-tbody-btn"
                      type="submit"
                      onClick={() => handleRemove(item)}
                    >
                      <DeleteForeverIcon />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>

        <div className="cart-section-total">
          <h3>Cart Total</h3>
          <div className="total-items">
            <p className="total-items-text">
              <span>Total items:</span> <span>${totalPrice}</span>
            </p>
            <p className="total-items-text">
              <span>Postage and packing:</span> <span>$9.63</span>
            </p>
            <hr />
            <p className="total-items-text-total">
              <span>Order Total:</span> <span> ${totalPrice + 9.63}</span>
            </p>
          </div>
          <span className="sub-text">Order totals include VAT.</span>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
