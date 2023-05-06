import React from "react";
import styles from "./ProductFilterBar.module.scss";
import DropDown from "../DropDown/DropDown";
import Chip from "../Chip/Chip";
import { useDispatch } from "react-redux";
import { updateFilters } from "../../features/products/productsSlice";

const hardCodedFilters = [
  {
    value: "gender",
    options: ["male", "female"],
  },
  {
    value: "color",
    options: ["Red", "Green", "Blue", "Black"],
  },
];

interface ProductFilterBarProps {
  filterSettings: {
    [key: string]: string[];
  };
}

function ProductFilterBar({ filterSettings }: ProductFilterBarProps) {
  const dispatch = useDispatch();
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFilters({ key: e.target.name, value: e.target.value }));
  };
  const handleFilterChipClick = (key: string, value: string) => {
    dispatch(updateFilters({ key: key, value: value }));
  };

  return (
    <section className={styles.filterBarWrapper}>
      <div className={styles.filterBar}>
        {hardCodedFilters.map((filter) => {
          return (
            <DropDown
              title={filter.value}
              value={filter.value}
              checked={filterSettings[filter.value]}
              key={filter.value}
              options={filter.options}
              onChange={handleFilterChange}
            />
          );
        })}
      </div>

      <div className={styles.filterTags}>
        {Object.entries(filterSettings).map(([key, value]) => (
          <>
            {value.map((option) => {
              return (
                <Chip
                  key={option}
                  text={option}
                  onClick={(e) => {
                    handleFilterChipClick(key, option);
                  }}
                />
              );
            })}
          </>
        ))}
      </div>
    </section>
  );
}

export default ProductFilterBar;
