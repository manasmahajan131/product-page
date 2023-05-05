import React from "react";
import styles from "./ProductFilterBar.module.scss";
import DropDown from "../DropDown/DropDown";

const hardCodedFilters = [
  {
    name: "Gender",
    value: "gender",
    filters: [
      { title: "Male", value: "male" },
      { title: "Female", value: "female" },
    ],
  },
];

function ProductFilterBar() {
  return (
    <section className={styles.filterBarWrapper}>
      <div className={styles.filterBar}>
        {hardCodedFilters.map((filter) => {
          return (
            <DropDown
              title={filter.name}
              value={filter.value}
              key={filter.value}
              options={filter.filters}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ProductFilterBar;
