import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../types/product";
import axios from "axios";

const initialState: ProductType[] = [];

export const fetchLimitedProducts = createAsyncThunk(
  "fetchLimitedProducts",
  async () => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products?offset=50&limit=10"
      );
      const data: ProductType[] | Error = await response.data;
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const limitedProductSlice = createSlice({
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
  },
  extraReducers: (build) => {
    build.addCase(fetchLimitedProducts.fulfilled, (state, action) => {
      if ("message" in action.payload && action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      } else {
        return action.payload;
      }
    });

    build.addCase(fetchLimitedProducts.rejected, (state, action) => {
      console.log("error in fetching data");
      return state;
    });

    build.addCase(fetchLimitedProducts.pending, (state, action) => {
      console.log("fetching limited products data");
      return state;
    });
  },
});

const limitedProductReducer = limitedProductSlice.reducer;
export default limitedProductReducer;
