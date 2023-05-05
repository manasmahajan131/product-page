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
  gender: string;
}

export interface Product {
  website_product: WebsiteProduct;
}

export interface ProductFilters {
  gender: string[];
}

interface ProductsState {
  products: Product[];
  filters: ProductFilters;
}

export interface UpdateFiltersPayload {
  key: string;
  value: string;
}

const initialState: ProductsState = {
  products: [],
  filters: {
    gender: [],
  },
};

export default initialState;
