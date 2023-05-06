import React, { useCallback, useRef, useState } from "react";
import { Product } from "../../features/products/types";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsPage.module.scss";
import ProductFilterBar from "../ProductFilterBar/ProductFilterBar";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import usePaginatedApi from "../../hooks/usePaginatedApi";
import { addProducts } from "../../features/products/productsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const filterProducts = (
  products: Product[],
  filterSettings: {
    [key: string]: string[];
  }
) => {
  return products.filter(
    (product) =>
      product.website_product &&
      (!filterSettings.gender.length ||
        filterSettings.gender.includes(product.website_product.gender)) &&
      (!filterSettings.color.length ||
        filterSettings.color.filter((element) =>
          product.website_product.color_order.includes(element)
        ).length)
  );
};

const baseUrl =
  "https://iaq0pu77z2.execute-api.us-west-1.amazonaws.com/Production/get-all-products?limit=20&amp;isNewWebsite=true";

function ProductsPage() {
  const [pageNo, setPageNo] = useState(0);

  const observer = useRef<IntersectionObserver | null>();

  const { products, isLoading } = usePaginatedApi(pageNo, baseUrl, addProducts);
  const { filters } = useSelector((state: RootState) => state.products);
  const filteredProducts = filterProducts(products, filters);

  const lastItemRef = useCallback((node: any) => {
    if (isLoading) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNo((prev) => prev + 1);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, []);

  return (
    <div>
      <h1>Quince</h1>
      <ProductFilterBar filterSettings={filters} />
      <section className={styles.productsContainer}>
        {filteredProducts &&
          filteredProducts.map((product: Product, index) => {
            return (
              <ProductCard
                name={product.website_product?.title}
                imgUrl={product.website_product?.images[0]?.image.url}
                rating={4.5}
                ref={
                  index == filteredProducts.length - 1 ? lastItemRef : undefined
                }
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
