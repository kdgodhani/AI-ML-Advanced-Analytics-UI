import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  createPurchaseOrder,
} from "../../services/Product/Product";
import { toast } from "react-toastify";

const initialState = {
  productList: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await getProducts();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "products/createOrder",
  async (productId, thunkAPI) => {
    try {
      const order = { id: Math.random().toString(), productId, amount: 100 }; // Dummy order
      const response = await createPurchaseOrder(order);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setDashboardText: (state, { payload }) => {
      state.dashBoardText = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, payload) => {
        state.isLoading = false;
        state.productList = payload.data;
      })
      .addCase(fetchProducts.rejected, (state, payload) => {
        state.isLoading = false;
        toast.error(
          payload && payload.message ? payload.message : "Server Error"
        );
      })

      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Order created successfully!");
      })
      .addCase(createOrder.rejected, (state, payload) => {
        state.isLoading = false;
        toast.error(
          payload && payload.message ? payload.message : "Server Error"
        );
      });
  },
});

export const { setDashboardText } = userSlice.actions;

export default productsSlice.reducer;
