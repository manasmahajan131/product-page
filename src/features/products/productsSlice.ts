import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import initialState from "./types";
import { Product, UpdateFiltersPayload } from "./types";

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = [...state.products, ...action.payload];
    },
    updateFilters: (state, action: PayloadAction<UpdateFiltersPayload>) => {
      switch (action.payload.key) {
        case "gender":
          const index = state.filters.gender.findIndex(
            (g) => g === action.payload.value
          );
          if (index === -1) {
            state.filters.gender.push(action.payload.value);
          } else {
            state.filters.gender.splice(index, 1);
          }
          break;
        default:
          break;
      }
    },
  },
});

export const { addProducts, updateFilters } = productsSlice.actions;

export default productsSlice.reducer;
