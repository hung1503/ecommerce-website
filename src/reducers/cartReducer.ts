import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType } from "../types/cart";

const initialState: CartType[] = [];

const getFromLocalStorage = (): CartType[] => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return initialState;
  }
};

const saveToLocalStorarge = (data: CartType[]) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const cartSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartType>) => {
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
      } else {
        saveToLocalStorarge([...localStorageData, action.payload]);
      }
    },
  },
});

const cartReducer = cartSlice.reducer;
export default cartReducer;
