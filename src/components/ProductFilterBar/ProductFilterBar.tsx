import React, { useEffect, useState } from "react";
import styles from "./ProductFilterBar.module.scss";
import { useDispatch } from "react-redux";
import {
  updateFilters,
  clearFilters,
} from "../../features/products/productsSlice";
import FilterBarDesktop from "./FilterBarDesktop";
import FilterBarMobile from "./FilterBarMobile";

export interface ProductFilterBarProps {
  filterSettings: {
    [key: string]: string[];
  };
}

function ProductFilterBar({ filterSettings }: ProductFilterBarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFilters({ key: e.target.name, value: e.target.value }));
  };

  const handleFilterChipClick = (key: string, value: string) => {
    dispatch(updateFilters({ key: key, value: value }));
  };

  const clearAllFilters = () => {
    dispatch(clearFilters());
  };

  useEffect(() => {
    const mediaWatcher = window.matchMedia("(max-width: 960px)");
    setIsMobile(mediaWatcher.matches);

    function updateIsNarrowScreen(e: MediaQueryListEvent) {
      setIsMobile(e.matches);
    }
    mediaWatcher.addEventListener("change", updateIsNarrowScreen);
    return () => {
      mediaWatcher.removeEventListener("change", updateIsNarrowScreen);
    };
  }, [setIsMobile]);

  return (
    <section className={styles.filterBarWrapper}>
      {isMobile ? (
        <FilterBarMobile
          filterSettings={filterSettings}
          handleFilterChange={handleFilterChange}
          handleFilterChipClick={handleFilterChipClick}
          clearFilters={clearAllFilters}
        />
      ) : (
        <FilterBarDesktop
          filterSettings={filterSettings}
          handleFilterChange={handleFilterChange}
          handleFilterChipClick={handleFilterChipClick}
        />
      )}
    </section>
  );
}

export default ProductFilterBar;
