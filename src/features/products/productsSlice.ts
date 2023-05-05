import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ImageDetails {
  url: string;
}

interface Image {
  image: ImageDetails;
}

interface WebsiteProduct {
  id: number;
  images: Array<Image>;
  title: string;
}

export interface Product {
  website_product: WebsiteProduct;
}

export interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {addProducts: (state, action: PayloadAction<Product[]>) => {
    state.products = [...state.products, ...action.payload]; 
  }},
});

export const {addProducts} = productsSlice.actions;

export default productsSlice.reducer;
