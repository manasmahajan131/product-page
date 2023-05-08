import React, { useState, useRef } from "react";
import styles from "./DropDown.module.scss";
import downArrow from "../../assets/svg/down-chevron.svg";
import upArrow from "../../assets/svg/up-chevron.svg";
import useClickAwayListener from "../../hooks/useClickAwayListener";
import { PropsWithChildren } from "react";

export interface DropDownProps {
  title: string;
}

function DropDown({ title, children }: PropsWithChildren<DropDownProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickAwayListener(wrapperRef, () => setIsOpen(false));

  return (
    <div className={styles.dropdownContainer} ref={wrapperRef}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.dropdownButtonText}>{title}</span>
        <img src={isOpen ? upArrow : downArrow} alt="" />
      </button>
      {isOpen && <div className={styles.dropdownMenu}>{children}</div>}
    </div>
  );
}

export default DropDown;
