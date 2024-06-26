import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  reportData: {},
};

export const getReportData = createAsyncThunk(
  "common/getReportData",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("user/admin/report/txnReport");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getProductById = createAsyncThunk(
  "common/fetchProductById",
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

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReportData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReportData.fulfilled, (state, { payload }) => {
        console.log(payload, " this is payload in common - 57");
        state.isLoading = false;
        state.reportData = payload.data;
        // state.totalProducts = payload.data.length;
      })
      .addCase(getReportData.rejected, (state, { payload }) => {
        state.isLoading = false;
        // state.error = payload;
        toast.error(
          payload && payload.message ? payload.message : "Server Error"
        );
      })

      //   .addCase(createPurchaseOrder.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(createPurchaseOrder.fulfilled, (state, { payload }) => {
      //     state.isLoading = false;
      //     // toast.success("Purchase Order Created Successfully");
      //   })
      //   .addCase(createPurchaseOrder.rejected, (state, { payload }) => {
      //     state.isLoading = false;
      //     // state.error = payload;
      //     toast.error(
      //       payload && payload.message ? payload.message : "Server Error"
      //     );
      //   })

      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, { payload }) => {
        console.log(state, "common slice - 87");
        state.isLoading = false;
        state.productData = payload.data;
        // state.totalProducts = payload.data.length;
      })
      .addCase(getProductById.rejected, (state, { payload }) => {
        state.isLoading = false;
        // state.error = payload;
        toast.error(
          payload && payload.message ? payload.message : "Server Error"
        );
      });
  },
});

export const { clearError } = commonSlice.actions;
export default commonSlice.reducer;
