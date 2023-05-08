import React from "react";
import { Product, ProductVariant } from "../../features/products/types";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsPage.module.scss";
import ProductFilterBar from "../ProductFilterBar/ProductFilterBar";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { addProducts } from "../../features/products/productsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";

const getMinPrice = (variants: ProductVariant[]) => {
  return variants.reduce((prev, curr) =>
    +prev.price < +curr.price ? prev : curr
  ).price;
};

export const hardCodedFilters = [
  {
    type: "gender",
    title: "Gender",
    options: [
      { name: "Male", value: "male" },
      { name: "Female", value: "female" },
      { name: "Unisex", value: "unisex" },
    ],
  },
  {
    type: "price",
    title: "Price",
    options: [
      { name: "Under $20", value: "0-20" },
      { name: "$20 - $50", value: "20-40" },
      { name: "$50 - $80", value: "50-80" },
    ],
  },
  {
    type: "isMadeToOrder",
    title: "Custom Order",
    options: [
      { name: "Made to order", value: "true" },
      { name: "Not made to order", value: "false" },
    ],
  },
];

const filterProducts = (
  products: Product[],
  filterSettings: {
    [key: string]: string[];
  }
) => {
  //hard coded for price, made to order and gender
  return products.filter(
    (product) =>
      product.website_product &&
      (!filterSettings.gender.length ||
        filterSettings.gender.includes(product.website_product.gender)) &&
      (!filterSettings.isMadeToOrder.length ||
        filterSettings.isMadeToOrder.includes(
          product.website_product.isMadeToOrder.toString()
        )) &&
      (!filterSettings.price.length ||
        filterSettings.price.find((price) => {
          const priceArray = price.split("-");
          const minPrice = +getMinPrice(product.website_product.variants);
          return minPrice >= +priceArray[0] && minPrice <= +priceArray[1];
        }))
  );
};

const baseUrl =
  "https://iaq0pu77z2.execute-api.us-west-1.amazonaws.com/Production/get-all-products?limit=20&amp;isNewWebsite=true";

function ProductsPage() {
  const { products } = useSelector((state: RootState) => state.products);
  const { lastItemRef, isLoading } = useInfiniteScroll(baseUrl, addProducts);
  const { filters } = useSelector((state: RootState) => state.products);
  const filteredProducts = filterProducts(products, filters);

  return (
    <div>
      <ProductFilterBar filterSettings={filters} />
      <section className={styles.productsContainer}>
        {filteredProducts?.length ? (
          <>
            {filteredProducts.map((product: Product, index) => {
              return (
                <ProductCard
                  key={product.website_product.id}
                  name={product.website_product?.title}
                  imgUrl={product.website_product?.images[0]?.image.url}
                  rating={
                    product.website_product.productReviewSummary.averageRating
                  }
                  ref={
                    index === filteredProducts.length - 1
                      ? lastItemRef
                      : undefined
                  }
                  price={getMinPrice(product.website_product.variants)}
                />
              );
            })}
            {[...Array(4 - (filteredProducts?.length % 4))].map((e, i) => (
              <div key={i}>
                <ProductCardSkeleton />
              </div>
            ))}
          </>
        ) : (
          <div ref={lastItemRef}></div>
        )}
      </section>

      <div className={styles.loadingSpinnerContainer}>
        {isLoading && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default ProductsPage;
