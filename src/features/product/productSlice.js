import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  productList: [],
  isLoading: false,
};

// Async thunks
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("products/getAll");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// export const createProduct = createAsyncThunk(
//   "products/create",
//   async (productId, thunkAPI) => {
//     try {
//       const order = { id: Math.random().toString(), productId, amount: 100 }; // Dummy order
//       const response = await createPurchaseOrder(order);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

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
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, payload) => {
        state.isLoading = false;
        state.productList = payload.data;
      })
      .addCase(getProducts.rejected, (state, payload) => {
        state.isLoading = false;
        toast.error(
          payload && payload.message ? payload.message : "Server Error"
        );
      });

    // .addCase(createProduct.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(createProduct.fulfilled, (state) => {
    //   state.isLoading = false;
    //   toast.success("Order created successfully!");
    // })
    // .addCase(createProduct.rejected, (state, payload) => {
    //   state.isLoading = false;
    //   toast.error(
    //     payload && payload.message ? payload.message : "Server Error"
    //   );
    // });
  },
});

export const { setDashboardText } = productsSlice.actions;

export default productsSlice.reducer;
