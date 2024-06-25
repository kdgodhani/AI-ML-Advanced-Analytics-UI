import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/user/userSlice";
// import cartReducer from "./features/cart/cartSlice";
import productsReducer from "./features/product/productSlice";
// import transactionsReducer from "./features/transaction/transactionsReducer";

export const store = configureStore({
  reducer: {
    user: userSlice,
    // cart: cartReducer,
    products: productsReducer,
    // transactions: transactionsReducer,
  },
});
