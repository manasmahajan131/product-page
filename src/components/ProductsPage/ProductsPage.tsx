import React from "react";
import { Product } from "../../features/products/types";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsPage.module.scss";
// import ProductFilterBar from "../ProductFilterBar/ProductFilterBar";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { addProducts } from "../../features/products/productsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// const filterProducts = (
//   products: Product[],
//   filterSettings: {
//     [key: string]: string[];
//   }
// ) => {
//   return products.filter(
//     (product) =>
//       product.website_product &&
//       (!filterSettings.gender.length ||
//         filterSettings.gender.includes(product.website_product.gender)) &&
//       (!filterSettings.color.length ||
//         filterSettings.color.filter((element) =>
//           product.website_product.color_order.includes(element)
//         ).length)
//   );
// };

const baseUrl =
  "https://iaq0pu77z2.execute-api.us-west-1.amazonaws.com/Production/get-all-products?limit=20&amp;isNewWebsite=true";

function ProductsPage() {
  const { products } = useSelector((state: RootState) => state.products);
  const { lastItemRef, isLoading } = useInfiniteScroll(baseUrl, addProducts);
  // const { filters } = useSelector((state: RootState) => state.products);
  // const filteredProducts = filterProducts(products, filters);

  return (
    <div>
      <h1>Quince</h1>
      {/* <ProductFilterBar filterSettings={filters} /> */}
      <section className={styles.productsContainer}>
        {products &&
          products.map((product: Product, index) => {
            return (
              <ProductCard
                key={product.website_product.id}
                name={product.website_product?.title}
                imgUrl={product.website_product?.images[0]?.image.url}
                rating={4.5}
                ref={index === products.length - 1 ? lastItemRef : undefined}
                price="50"
              />
            );
          })}
      </section>
      {isLoading && (
        <div className={styles.loadingSpinnerContainer}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
