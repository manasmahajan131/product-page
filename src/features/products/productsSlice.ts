import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import initialState from "./types";
import { Product } from "./types";

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      const updatedProducts = [...state.products];
      action.payload.forEach((product) => {
        if (
          product.website_product &&
          updatedProducts.findIndex(
            (p) => p.website_product.id === product.website_product.id
          ) === -1
        ) {
          updatedProducts.push(product);
        }
      });
      state.products = updatedProducts;
    },
    updateFilters: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const updatedFilterSettings = { ...state.filters };
      const ind = updatedFilterSettings[action.payload.key].findIndex(
        (ele) => ele === action.payload.value
      );
      if (ind === -1) {
        updatedFilterSettings[action.payload.key].push(action.payload.value);
      } else {
        updatedFilterSettings[action.payload.key].splice(ind, 1);
      }
      state.filters = updatedFilterSettings;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { addProducts, updateFilters, clearFilters } = productsSlice.actions;

export default productsSlice.reducer;
