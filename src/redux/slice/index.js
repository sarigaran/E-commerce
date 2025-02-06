import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("getProduct", async (value) => {
  try {
    const response = await axios.get(
      value === "All" ? `/products` : `/products/category/${value}`
    );
    return response.data;
  } catch (err) {
    console.log("error", err);
  }
});

export const getCategory = createAsyncThunk("gecategory", async () => {
  const response = await axios.get(`/products/categories`);
  return response.data;
});

const initialState = {
  error: null,
  loading: false,
  productdata: null,
  categorydata: null,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productdata = action.payload;
      })
      .addCase(getProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categorydata = action.payload;
      });
  },
});

export default productSlice.reducer;
