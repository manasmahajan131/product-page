import React from "react";
import { forwardRef } from "react";
import styles from "./ProductCard.module.scss";
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
          <picture>
            <source
              type="image/webp"
              srcSet={`${imgUrl}?w=360&h=450&q=50&fm=webp 360w,
                ${imgUrl}?w=720&h=900&q=50&fm=webp 720w,
                ${imgUrl}?w=1440&h=1800&q=50&fm=webp 1440w,
                ${imgUrl}?w=1600&h=2000&q=50&fm=webp 1600w`}
              sizes="(max-width: 1600px) 100vw, 1600px"
            />
            <source
              srcSet={`${imgUrl}?w=360&h=450&q=50 360w,
                ${imgUrl}?w=720&h=900&q=50 720w,
                ${imgUrl}?w=1440&h=1800&q=50 1440w,
                ${imgUrl}?w=1600&h=2000&q=50 1600w`}
              sizes="(max-width: 1600px) 100vw, 1600px"
            />
            <img
              srcSet={`${imgUrl}?w=360&h=450&q=50 360w,
                ${imgUrl}?w=720&h=900&q=50 720w,
                ${imgUrl}?w=1440&h=1800&q=50 1440w,
                ${imgUrl}?w=1600&h=2000&q=50 1600w`}
              src={`${imgUrl}?w=1600&q=50`}
              sizes="(max-width: 1600px) 100vw, 1600px"
              alt="hero-image"
            />
          </picture>
        </div>
        <div className={styles.bottomSectionWrapper}>
          <div className={styles.nameAndPriceSection}>
            <div>{name}</div>
            <div className={styles.productPriceWrapper}>
              {USDollar.format(+price)}
            </div>
          </div>
          <div className={styles.ratingSection}>
            <img src={star} width={14} alt=""/>
            <span>{rating}</span>
          </div>
        </div>
      </div>
    );
  }
);

export default ProductCard;
