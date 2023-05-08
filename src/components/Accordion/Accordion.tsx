import React, { useState } from "react";
import styles from "./Accordion.module.scss";
import { DropDownProps } from "../DropDown/DropDown";
import downArrow from "../../assets/svg/down-chevron.svg";
import upArrow from "../../assets/svg/up-chevron.svg";
import { PropsWithChildren } from "react";

const Accordion = ({ title, children }: PropsWithChildren<DropDownProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <button
        className={styles.accordionButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <img src={isOpen ? upArrow : downArrow} alt="" />
      </button>
      {isOpen && children}
    </div>
  );
};

export default Accordion;
