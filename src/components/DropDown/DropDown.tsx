import React, { useState } from "react";
import styles from "./DropDown.module.scss";
import downArrow from "../../assets/svg/down-chevron.svg";
import upArrow from "../../assets/svg/up-chevron.svg";

interface DropDownProps {
  title: string;
  value: string;
  checked: string[];
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function DropDown({ title, value, checked, options, onChange }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdownContainer}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.dropdownButtonText}>{title}</span>
        <img src={isOpen ? upArrow : downArrow} />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => {
            return (
              <label key={option}>
                <input
                  type="checkbox"
                  name={value}
                  value={option}
                  checked={checked.includes(option)}
                  onChange={onChange}
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropDown;
