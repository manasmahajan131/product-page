import React from "react";
import styles from "./ProductFilterBar.module.scss";
import DropDown from "../DropDown/DropDown";

function ProductFilterBar() {
  return (
    <section className={styles.filterBarWrapper}>
      <div className={styles.filterBar}>
        <DropDown />
      </div>
    </section>
  );
}

export default ProductFilterBar;
