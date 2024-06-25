import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Function to load cart items from localStorage
const loadCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};

const initialState = {
  items: loadCartFromLocalStorage(), // Initialize cart items from localStorage
};

// Async thunk for adding to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const state = getState().cart; // Get the cart slice state
      const existingProductIndex = state.items.findIndex(
        (item) => item.id === productId
      );

      if (existingProductIndex !== -1) {
        // If product already exists in cart, increment quantity
        const updatedItems = state.items.map((item, index) => {
          if (index === existingProductIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        // Otherwise, add new product to cart
        const newItem = { id: productId, quantity: 1 };
        const updatedItems = [...state.items, newItem];
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      }
    } catch (error) {
      // Handle error
      console.error("Error adding to cart:", error);
      return rejectWithValue(error.message); // Using rejectWithValue to handle rejection
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.items.find((item) => item.id === productId);
      if (existingProduct) {
        existingProduct.quantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.items.find((item) => item.id === productId);
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    setCartItemsFromLocalStorage: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.rejected, (state, action) => {
      // Handle any specific error cases for addToCart
      console.error("addToCart failed:", action.error.message);
      toast.error("Failed to add to cart", {
        position: "top-center",
      });
    });
  },
});

export const {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setCartItemsFromLocalStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
