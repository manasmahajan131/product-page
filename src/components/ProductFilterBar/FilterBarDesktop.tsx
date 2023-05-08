import React from "react";
import DropDown from "../DropDown/DropDown";
import { hardCodedFilters } from "../ProductsPage/ProductsPage";
import styles from "./ProductFilterBar.module.scss";
import { ProductFilterBarProps } from "./ProductFilterBar";
import ProductTags from "./ProductTags";

interface FilterBarDesktopProps {
  filterSettings: ProductFilterBarProps["filterSettings"];
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterChipClick: (key: string, value: string) => void;
}
const FilterBarDesktop = ({
  filterSettings,
  handleFilterChange,
  handleFilterChipClick,
}: FilterBarDesktopProps) => {
  return (
    <>
      <div className={styles.filterBar}>
        {hardCodedFilters.map((filter) => {
          return (
            <DropDown title={filter.title} key={filter.type}>
              {filter.options.map((option) => {
                return (
                  <label key={option.value}>
                    <input
                      type="checkbox"
                      name={filter.type}
                      value={option.value}
                      checked={filterSettings[filter.type].includes(
                        option.value
                      )}
                      onChange={handleFilterChange}
                    />
                    <span>{option.name}</span>
                  </label>
                );
              })}
            </DropDown>
          );
        })}
      </div>

      <div className={styles.filterTags}>
        <ProductTags
          filterSettings={filterSettings}
          handleClick={handleFilterChipClick}
        />
      </div>
    </>
  );
};

export default FilterBarDesktop;
