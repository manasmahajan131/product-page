import React from "react";
import styles from "./ProductFilterBar.module.scss";
import DropDown from "../DropDown/DropDown";
import Chip from "../Chip/Chip";
import { useDispatch } from "react-redux";
import { updateFilters } from "../../features/products/productsSlice";
import filtersIcon from "../../assets/svg/filter.svg";
import { hardCodedFilters } from "../ProductsPage/ProductsPage";

const getFilterNameFromValue = (type: string, value: string) => {
  return (
    hardCodedFilters[
      hardCodedFilters.findIndex((filter) => filter.type == type)
    ].options.find((option) => option.value === value)?.name || ""
  );
};

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
              title={filter.title}
              value={filter.type}
              checked={filterSettings[filter.type]}
              key={filter.type}
              options={filter.options}
              onChange={handleFilterChange}
            />
          );
        })}
      </div>

      <div className={styles.filterBarMobile}>
        <button>
          <img src={filtersIcon} alt="" />
        </button>
      </div>

      <div className={styles.filterTags}>
        {Object.entries(filterSettings).map(([key, value]) => (
          <>
            {value.map((option) => {
              return (
                <Chip
                  key={option}
                  text={getFilterNameFromValue(key, option)}
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
