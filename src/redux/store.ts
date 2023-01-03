import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cartReducer from "../reducers/cartReducer";
import productReducer from "../reducers/productReducer";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
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
