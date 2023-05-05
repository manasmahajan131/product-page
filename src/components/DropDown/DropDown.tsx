import React, { useState } from "react";
import styles from "./DropDown.module.scss";
import downArrow from "../../assets/svg/down-chevron.svg";
import upArrow from "../../assets/svg/up-chevron.svg";
import { useDispatch } from "react-redux";
import { updateFilters } from "../../features/products/productsSlice";

export interface ProductFilterOption {
  title: string;
  value: string;
}

interface DropDownProps {
  title: string;
  value: string;
  options: ProductFilterOption[];
}

function DropDown({ title, value, options }: DropDownProps) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFilters({ key: e.target.name, value: e.target.value }));
  };

  return (
    <div className={styles.dropdownContainer}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.dropdownButtonText}>{title}</span>
        <span>
          <img src={isOpen ? upArrow : downArrow} />
        </span>
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => {
            return (
              <label key={option.value}>
                <input
                  type="checkbox"
                  name={value}
                  value={option.value}
                  // checked={checkedState[index]}
                  onChange={handleChange}
                />
                <span>{option.title}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropDown;
