import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType } from "../types/cart";

export const getFromLocalStorage = (): CartType[] => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

const saveToLocalStorarge = (data: CartType[]) => {
  localStorage.setItem("cart", JSON.stringify(data));
};
const initialState: CartType[] = getFromLocalStorage();
const cartSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartType>) => {
      console.log(action.payload);
      const localStorageData = getFromLocalStorage();
      const foundProduct = localStorageData.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (foundProduct) {
        const cart = localStorageData.map((item) => {
          if (item.product.id === action.payload.product.id) {
            let totalQuantity = item.quantity + action.payload.quantity;
            let totalAmount = totalQuantity * item.product.price;
            return {
              ...foundProduct,
              quantity: totalQuantity,
              totalPrice: totalAmount,
            };
          } else {
            return item;
          }
        });
        saveToLocalStorarge(cart);
        return (state = cart);
      } else {
        saveToLocalStorarge([...localStorageData, action.payload]);
        return (state = [...localStorageData, action.payload]);
      }
    },
    removeFromCart: (state, action: PayloadAction<CartType>) => {
      const localStorageData = getFromLocalStorage();
      const cart = localStorageData.filter((item) => {
        return item.product.id !== action.payload.product.id;
      });
      saveToLocalStorarge(cart);
      return (state = cart);
    },
    increaseQuantity: (state, action: PayloadAction<CartType>) => {
      const localStorageData = getFromLocalStorage();
      const item = localStorageData.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.product.price;
        saveToLocalStorarge(localStorageData);
        return (state = localStorageData);
      } else {
        return state;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<CartType>) => {
      const localStorageData = getFromLocalStorage();
      const item = localStorageData.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
          item.totalPrice = item.quantity * item.product.price;
          saveToLocalStorarge(localStorageData);
          return (state = localStorageData);
        } else {
          item.quantity = 1;
          item.totalPrice = item.quantity * item.product.price;
          saveToLocalStorarge(localStorageData);
          return (state = localStorageData);
        }
      }
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartReducer;
