import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import categoryReducer from "./reducers/categoryReducer";
import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";

export const createStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      cart: cartReducer,
      user: userReducer,
      categories: categoryReducer,
    },
  });
};

const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
