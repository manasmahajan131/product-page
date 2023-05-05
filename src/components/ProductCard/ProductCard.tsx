import React from "react";
import { forwardRef } from "react";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  name: string;
  imgUrl: string;
  rating: number;
}

const ProductCard = forwardRef<HTMLInputElement, ProductCardProps>(
  function ProductCard({ name, imgUrl, rating }, ref) {
    return (
      <div>
        <div ref={ref} className={styles.productImageContainer}>
          <img
            src={`${imgUrl}?w=720&h=900&q=50&fm=webp`}
            loading="eager"
            decoding="async"
          />
        </div>
        <div>{name}</div>
      </div>
    );
  }
);

export default ProductCard;
