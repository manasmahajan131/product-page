import React, { useState } from "react";
import styles from "./DropDown.module.scss";
import downArrow from "../../assets/svg/down-chevron.svg";
import upArrow from "../../assets/svg/up-chevron.svg";

const props = {
  text: "Color",
};
function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.dropdownContainer}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.dropdownButtonText}>{props.text}</span>
        <span>
          <img src={isOpen ? upArrow : downArrow} />
        </span>
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <label>
            <input
              type="checkbox"
              // name={name}
              // value={name}
              // checked={checkedState[index]}
              // onChange={() => handleOnChange(index)}
            />
            Green
          </label>
        </div>
      )}
    </div>
  );
}

export default DropDown;
