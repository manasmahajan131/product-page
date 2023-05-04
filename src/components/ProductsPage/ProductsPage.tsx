import React, { useCallback, useEffect, useRef, useState } from "react";

import axios, { Canceler } from "axios";

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

interface Product {
  website_product: WebsiteProduct;
}

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  
  const observer = useRef<IntersectionObserver | null>();
  const nextUrl = useRef(
    "https://iaq0pu77z2.execute-api.us-west-1.amazonaws.com/Production/get-all-products?limit=20&amp;isNewWebsite=true"
  );

  const lastItemRef = useCallback(
    (node: any) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("Loading more");
          setPage((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading]
  );

  const loadProducts = async (setCanceller?: (c: Canceler) => void) => {
    setIsLoading(true);

    try {
      console.log("next url for loading", nextUrl);
      const response = await axios({
        method: "GET",
        url: nextUrl.current,
        cancelToken: setCanceller
          ? new axios.CancelToken((c) => setCanceller(c))
          : undefined,
      });
      nextUrl.current = response.data.next_url;
      setProducts((prevproducts) => [...prevproducts, ...response.data.data]);
    } catch (error) {
      if (axios.isCancel(error)) return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancel: Canceler;
    const setCanceller = (canceller: Canceler) => {
      cancel = canceller;
    };
    loadProducts(setCanceller);
    return () => cancel();
  }, [page]);

  return (
    <div>
      {products &&
        products.map((product: Product, index) => {
          if (index == products.length - 1) {
            return (
              <div ref={lastItemRef}>{product.website_product?.title}</div>
            );
          }
          return (
            <div style={{ marginBottom: "32px" }}>
              {product.website_product?.title}
            </div>
          );
        })}
      {isLoading && <div>...Loading</div>}
    </div>
  );
}

export default ProductsPage;
