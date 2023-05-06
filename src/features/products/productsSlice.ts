import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import initialState from "./types";
import { Product } from "./types";

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = [...state.products, ...action.payload];
    },
    updateFilters: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const updatedFilterSettings = { ...state.filters };
      const ind = updatedFilterSettings[action.payload.key].findIndex(
        (ele) => ele === action.payload.value
      );
      if (ind == -1) {
        updatedFilterSettings[action.payload.key].push(action.payload.value);
      } else {
        updatedFilterSettings[action.payload.key].splice(ind, 1);
      }
      state.filters = updatedFilterSettings;
    },
  },
});

export const { addProducts, updateFilters } = productsSlice.actions;

export default productsSlice.reducer;
