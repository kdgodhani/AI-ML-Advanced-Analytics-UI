import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { toast } from "react-toastify";
// import {
//   GetProducts,
//   GetProductsById,
//   CreateProduct,
// } from "../../Services/Product/Product";

const initialState = {
  isLoading: false,
  products: [],
  totalProducts: 0,
  error: null,
  productData: {},
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("product/getAll");
      console.log(resp, "resp- 22");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, thunkAPI) => {
    console.log(getProductById, "getProductById");
    try {
      const resp = await customFetch.get(
        `product/getById?productId=${productId}`
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// It's just for revoke dispatch method of cart to store local storage
export const createPurchaseOrder = createAsyncThunk(
  "products/createPurchaseOrder",
  async (productId, thunkAPI) => {
    try {
      const order = { id: Math.random().toString(), productId, amount: 100 }; 
      return order;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.data;
        state.totalProducts = payload.data.length;
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        // state.error = payload;
        toast.error(payload && payload.message?payload.message:"Server Error");
      })

      .addCase(createPurchaseOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPurchaseOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // toast.success("Purchase Order Created Successfully");
      })
      .addCase(createPurchaseOrder.rejected, (state, { payload }) => {
        state.isLoading = false;
        // state.error = payload;
        toast.error(payload && payload.message?payload.message:"Server Error");
      })



      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.productData = payload.data;
        // state.totalProducts = payload.data.length;
      })
      .addCase(getProductById.rejected, (state, { payload }) => {
        state.isLoading = false;
        // state.error = payload;
        toast.error(payload && payload.message?payload.message:"Server Error");
      });
  },
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;
