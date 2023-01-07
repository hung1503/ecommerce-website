import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cartReducer from "../reducers/cartReducer";
import categoryReducer from "../reducers/categoryReducer";
import productReducer from "../reducers/productReducer";
import userReducer from "../reducers/userReducer";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    categories: categoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
