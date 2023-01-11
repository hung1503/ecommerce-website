import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "../../common/axiosInstance";
import { CategoryType } from "../../types/category";

const initialState: CategoryType[] = [];

export const fetchAllCategories = createAsyncThunk(
  "fetchAllCategories",
  async () => {
    try {
      const response = await axiosInstance.get("/categories");
      const data: CategoryType[] = await response.data;
      return data;
    } catch (e: any) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchAllCategories.fulfilled, (state, action) => {
      if ("message" in action.payload && action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      } else {
        return action.payload;
      }
    });

    build.addCase(fetchAllCategories.rejected, (state, action) => {
      console.log("error in fetching data");
      return state;
    });

    build.addCase(fetchAllCategories.pending, (state, action) => {
      console.log("fetching all categories data");
      return state;
    });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
