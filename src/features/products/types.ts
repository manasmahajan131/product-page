interface ImageDetails {
  url: string;
}

interface Image {
  image: ImageDetails;
}

interface ProductReviewSummary {
  averageRating: number;
}

export interface ProductVariant {
  price: string;
}

interface WebsiteProduct {
  id: number;
  images: Array<Image>;
  title: string;
  gender: string;
  isMadeToOrder: boolean;
  color_order: string[];
  productReviewSummary: ProductReviewSummary;
  variants: ProductVariant[];
}

export interface Product {
  website_product: WebsiteProduct;
}

interface ProductsReducerState {
  products: Product[];
  filters: { [key: string]: string[] };
}

const initialState: ProductsReducerState = {
  products: [],
  filters: {
    gender: [],
    price: [],
    isMadeToOrder: [],
  },
};

export default initialState;
