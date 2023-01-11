import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateProduct,
  CreateProductWithForm,
  ProductType,
  UpdateProduct,
} from "../../types/product";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../common/axiosInstance";

const initialState: ProductType[] = [];

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const response = await axiosInstance.get("/products");
      const data: ProductType[] = await response.data;
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
      const response = await axiosInstance.get(
        `/products/?categoryId=${filter}`
      );
      const data: ProductType[] = await response.data;
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "createProduct",
  async (product: CreateProduct) => {
    try {
      const response: AxiosResponse<ProductType, any> =
        await axiosInstance.post("/products/", product);
      const data = await response.data;
      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ id, update }: UpdateProduct) => {
    try {
      const response: AxiosResponse<ProductType, any> = await axiosInstance.put(
        `/products/${id}`,
        update
      );
      const data = await response.data;
      return data;
    } catch (error: any) {
      console.log(error.response.status, error.response.statusText);
    }
  }
);

export const createProductWithForm = createAsyncThunk(
  "createProductWithForm",
  async ({ images, product }: CreateProductWithForm) => {
    let location = [];
    try {
      for (let i = 0; i < images.length; i++) {
        const response = await axios.post(
          "https://api.escuelajs.co/api/v1/files/upload",
          { file: images && images[i] },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const img = await response.data.location;
        location.push(img);
      }

      const resProduct = await axiosInstance.post("/products/", {
        ...product,
        images: [...location],
      });
      const data = await resProduct.data;
      return data;
    } catch (e: any) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const removeProduct = createAsyncThunk(
  "removeProduct",
  async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/products/${id}`);
      const data = await response.data;
      return data;
    } catch (error: any) {
      console.log(error.response.status, error.response.statusText);
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
    build
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        if ("message" in action.payload && action.payload) {
          return state;
        } else if (!action.payload) {
          return state;
        } else {
          return action.payload;
        }
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        console.log("error in fetching data");
        return state;
      })
      .addCase(fetchAllProducts.pending, (state, action) => {
        // console.log("fetching all products data");
        return state;
      });

    build
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        if ("message" in action.payload && action.payload) {
          return state;
        } else if (!action.payload) {
          return state;
        } else {
          return action.payload;
        }
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        console.log("error in fetching data");
        return state;
      })
      .addCase(fetchFilteredProducts.pending, (state, action) => {
        console.log("fetching all filtered products data");
        return state;
      });
    build.addCase(createProduct.fulfilled, (state, action) => {
      if (action.payload) {
        state.push(action.payload);
      }
      return state;
    });
    build.addCase(createProductWithForm.fulfilled, (state, action) => {
      if (action.payload) {
        state.push(action.payload);
      }
      return state;
    });
    build.addCase(updateProduct.fulfilled, (state, action) => {
      return state.map((product) => {
        if (product.id === action.payload?.id) {
          return action.payload;
        }
        return product;
      });
    });
    build.addCase(removeProduct.fulfilled, (state, action) => {
      return state.filter((product) => product.id !== action.payload?.id);
    });
  },
});

const productReducer = productSlice.reducer;
export const { sortName, sortPrice } = productSlice.actions;
export default productReducer;
