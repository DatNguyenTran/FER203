import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => state.filter((_, i) => i !== action.payload),
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export const cartStore = configureStore({
  reducer: { cart: cartSlice.reducer },
});
