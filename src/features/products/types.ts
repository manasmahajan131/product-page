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
  color_order: string[];
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
    color: [],
  },
};

export default initialState;
