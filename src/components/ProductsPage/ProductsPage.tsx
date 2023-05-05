import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Product, addProducts } from "../../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsPage.module.scss";
import ProductFilterBar from "../ProductFilterBar/ProductFilterBar";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const baseUrl =
  "https://iaq0pu77z2.execute-api.us-west-1.amazonaws.com/Production/get-all-products?limit=20&amp;isNewWebsite=true";

function ProductsPage() {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);

  const observer = useRef<IntersectionObserver | null>();
  const nextUrl = useRef<string>(baseUrl);

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

  const loadProducts = async (signal: AbortSignal) => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: nextUrl.current,
      signal: signal,
    })
      .then((res) => {
        dispatch(
          addProducts(
            res.data.data.filter((product: Product) => product.website_product)
          )
        );
        setIsLoading(false);
        nextUrl.current = res.data.next_url;
      })
      .catch((err) => {
        if (signal.aborted) return;
        console.error(err);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    loadProducts(controller.signal);
    return () => {
      controller.abort();
    };
  }, [pageNo]);

  return (
    <div>
      <h1>Quince</h1>
      <ProductFilterBar />
      <section className={styles.productsContainer}>
        {products &&
          products.map((product: Product, index) => {
            return (
              <ProductCard
                name={product.website_product?.title}
                imgUrl={product.website_product?.images[0]?.image.url}
                rating={4.5}
                ref={index == products.length - 1 ? lastItemRef : undefined}
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
