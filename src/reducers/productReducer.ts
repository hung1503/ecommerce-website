import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../types/product";
import axios, { AxiosResponse } from "axios";

const initialState: ProductType[] = [];

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      const data: ProductType[] | Error = await response.data;
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "fetchFilteredProducts",
  async (filter: number) => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?categoryId=${filter}`
      );
      const data: ProductType[] | Error = await response.data;
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
    sortName: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        state.sort((a, b) => b.title.localeCompare(a.title));
      }
    },
    sortPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.sort((a, b) => a.price - b.price);
      } else {
        state.sort((a, b) => b.price - a.price);
      }
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchAllProducts.fulfilled, (state, action) => {
      if ("message" in action.payload && action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      } else {
        return action.payload;
      }
    });
    build.addCase(fetchAllProducts.rejected, (state, action) => {
      console.log("error in fetching data");
      return state;
    });
    build.addCase(fetchAllProducts.pending, (state, action) => {
      console.log("fetching all products data");
      return state;
    });

    build.addCase(fetchFilteredProducts.fulfilled, (state, action) => {
      if ("message" in action.payload && action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      } else {
        console.log("action.payload", action.payload);
        return action.payload;
      }
    });
    build.addCase(fetchFilteredProducts.rejected, (state, action) => {
      console.log("error in fetching data");
      return state;
    });
    build.addCase(fetchFilteredProducts.pending, (state, action) => {
      console.log("fetching all filtered products data");
      return state;
    });
  },
});

const productReducer = productSlice.reducer;
export const { sortName, sortPrice } = productSlice.actions;
export default productReducer;
