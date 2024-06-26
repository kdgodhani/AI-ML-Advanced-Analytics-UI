import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  reportData: {},
  predictProduct: null,
  pendingOrder: [],
  secureLink: "",
  paymentLink: "",
  paymentCheckoutData: {},
  txnDoneOrder: [],
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

export const getPredictProduct = createAsyncThunk(
  "common/getPredictProduct",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("user/admin/report/predictProduct");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getAllPendingOrder = createAsyncThunk(
  "common/getAllPendingOrder",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("order/getAllPendingOrders");
      return resp.data;
    } catch (error) {
      //   console.log(error, "error - slice -48");
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getTxnDoneOrder = createAsyncThunk(
  "common/getTxnDoneOrder",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("order/getTxnDoneOrder");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const generateSecurePaymentLink = createAsyncThunk(
  "common/generateLink",
  async (orderId, thunkAPI) => {
    try {
      //   console.log(orderId, "orderId");
      const resp = await customFetch.post(
        `order/payment/generateLink?orderId=${orderId}`
      );
      return resp.data;
    } catch (error) {
      //   console.log(error, "error - slice -48");
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const verifySecurePaymentLink = createAsyncThunk(
  "common/verifyLink",
  async (token, thunkAPI) => {
    try {
      const resp = await customFetch.post(
        `order/payment/verifyLink?token=${token}`
      );
      return resp.data;
    } catch (error) {
      //   console.log(error, "error - slice -48");
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const paymentCheckout = createAsyncThunk(
  "common/paymentCheckout",
  async (productsData, thunkAPI) => {
    try {
      const resp = await customFetch.post(
        `order/payment/checkOut`,
        productsData
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const txnStatusUpdate = createAsyncThunk(
  "common/txnStatusUpdate",
  async ({ orderId, isSuccess }, thunkAPI) => {
    try {
      const resp = await customFetch.post(
        "order/payment/updateStatusByorderId",
        { orderId, isSuccess }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getOrderByUserId = createAsyncThunk(
  "common/getOrderByUserId",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("order/getOrderByUserId");
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
        // console.log(payload, " this is payload in common - 57");
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

      .addCase(getPredictProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPredictProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.predictProduct = payload.data;
        // state.totalProducts = payload.data.length;
      })
      .addCase(getPredictProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        // state.error = payload;
        toast.error(
          payload && payload.message ? payload.message : "Server Error"
        );
      })

      .addCase(getAllPendingOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPendingOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.pendingOrder = payload.data;
        // state.totalProducts = payload.data.length;
      })
      .addCase(getAllPendingOrder.rejected, (state, { payload }) => {
        state.isLoading = false;
        // state.error = payload;
        toast.error(
          payload && payload.message ? payload.message : "Server Error"
        );
      })

      .addCase(generateSecurePaymentLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateSecurePaymentLink.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.secureLink = payload.data.payment_link;
      })
      .addCase(generateSecurePaymentLink.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(
          payload && payload.message ? payload.message : "Server Error"
        );
      })

      .addCase(verifySecurePaymentLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifySecurePaymentLink.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.paymentLink = payload.data.url;
      })
      .addCase(verifySecurePaymentLink.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(
          payload && payload.message ? payload.message : "Server Error"
        );
      })

      .addCase(paymentCheckout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paymentCheckout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.paymentCheckoutData = payload.data.url;
      })
      .addCase(paymentCheckout.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(
          payload && payload.message ? payload.message : "Server Error"
        );
      })

      .addCase(txnStatusUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(txnStatusUpdate.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Order status updated successfully!");
      })
      .addCase(txnStatusUpdate.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(
          payload && payload.message
            ? payload.message
            : "Failed to update order status"
        );
      })

      .addCase(getTxnDoneOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTxnDoneOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.txnDoneOrder = payload.data;
        // state.totalProducts = payload.data.length;
      })
      .addCase(getTxnDoneOrder.rejected, (state, { payload }) => {
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
