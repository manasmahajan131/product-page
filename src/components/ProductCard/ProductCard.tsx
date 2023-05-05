import React from "react";
import { forwardRef } from "react";
import styles from "./ProductCard.module.css";
import star from "../../assets/svg/solid-star.svg";

interface ProductCardProps {
  name: string;
  imgUrl: string;
  rating: number;
  price: string;
}

const ProductCard = forwardRef<HTMLInputElement, ProductCardProps>(
  function ProductCard({ name, imgUrl, rating, price }, ref) {
    let USDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return (
      <div>
        <div ref={ref} className={styles.productImageContainer}>
          <img
            src={`${imgUrl}?w=720&h=900&q=50&fm=webp`}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className={styles.bottomSectionWrapper}>
          <div className={styles.nameAndPriceSection}>
            <div>{name}</div>
            <div className={styles.productPriceWrapper}>
              {USDollar.format(+price)}
            </div>
          </div>
          <div className={styles.ratingSection}>
            <img src={star} width={14} />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    );
  }
);

export default ProductCard;
