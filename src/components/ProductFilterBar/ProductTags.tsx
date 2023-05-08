import { useMemo } from "react";
import Chip from "../Chip/Chip";
import { hardCodedFilters } from "../ProductsPage/ProductsPage";
import { ProductFilterBarProps } from "./ProductFilterBar";

const getFilterNameFromValue = (type: string, value: string) => {
  return (
    hardCodedFilters[
      hardCodedFilters.findIndex((filter) => filter.type === type)
    ].options.find((option) => option.value === value)?.name || ""
  );
};

const flattenFilterSettings = (
  filterSettings: ProductFilterBarProps["filterSettings"]
) => {
  const flattenedFilters: { type: string; value: string }[] = [];
  Object.entries(filterSettings).forEach(([key, value]) => {
    value.forEach((option) => {
      flattenedFilters.push({ type: key, value: option });
    });
  });
  return flattenedFilters;
};

const ProductTags = ({
  filterSettings,
  handleClick,
}: {
  filterSettings: ProductFilterBarProps["filterSettings"];
  handleClick: (key: string, option: string) => void;
}) => {
  const flatFilters = useMemo(
    () => flattenFilterSettings(filterSettings),
    [filterSettings]
  );
  return (
    <>
      {flatFilters.map((filter) => (
        <Chip
          key={filter.value + filter.type}
          text={getFilterNameFromValue(filter.type, filter.value)}
          onClick={(e) => {
            handleClick(filter.type, filter.value);
          }}
        />
      ))}
    </>
  );
};

export default ProductTags;
