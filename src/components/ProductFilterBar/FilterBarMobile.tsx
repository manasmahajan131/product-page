import React, { useState } from "react";
import ProductTags from "./ProductTags";
import filtersIcon from "../../assets/svg/filter.svg";
import closeIcon from "../../assets/svg/close.svg";
import { hardCodedFilters } from "../ProductsPage/ProductsPage";
import Accordion from "../Accordion/Accordion";
import { ProductFilterBarProps } from "./ProductFilterBar";
import styles from "./ProductFilterBar.module.scss";

const getSelectedFiltersLength = (
  filterSettings: ProductFilterBarProps["filterSettings"]
) => {
  return Object.values(filterSettings).reduce(
    (prev, curr) => prev + curr.length,
    0
  );
};

interface FilterBarMobileProps {
  filterSettings: ProductFilterBarProps["filterSettings"];
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterChipClick: (key: string, value: string) => void;
  clearFilters: () => void;
}

const FilterBarMobile = ({
  filterSettings,
  handleFilterChange,
  handleFilterChipClick,
  clearFilters,
}: FilterBarMobileProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const closeMobileFilters = () => {
    setMobileFiltersOpen(false);
  };
  return (
    <>
      <div className={styles.filterBarMobile}>
        <button onClick={() => setMobileFiltersOpen(true)}>
          <img src={filtersIcon} alt="" />
        </button>
        {`(${getSelectedFiltersLength(filterSettings)})`}
      </div>

      {mobileFiltersOpen && (
        <div className={styles.filterMenuMobile}>
          <div className={styles.closeButtonWrapper}>
            <button onClick={closeMobileFilters}>
              <img src={closeIcon}></img>
            </button>
          </div>
          <div className={styles.filterMenuMobileContent}>
            {hardCodedFilters.map((filter) => {
              return (
                <Accordion title={filter.title} key={filter.type}>
                  <div className={styles.mobileAccordionMenu}>
                    {filter.options.map((option) => {
                      return (
                        <label
                          key={option.value}
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                          }}
                        >
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
                  </div>
                </Accordion>
              );
            })}
            <div className={styles.mobileFilterActions}>
              <button
                onClick={closeMobileFilters}
                className={styles.applyFiltersButton}
              >
                Apply Filters
              </button>
              <button onClick={clearFilters}>Clear all</button>
            </div>
            <div className={styles.selectedFiltersMobile}>
              <ProductTags
                filterSettings={filterSettings}
                handleClick={handleFilterChipClick}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterBarMobile;
