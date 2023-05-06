import React from "react";
import close from "../../assets/svg/close.svg";
import styles from "./Chip.module.scss";

const Chip = ({
  text,
  onClick,
}: {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.filterChip} onClick={onClick}>
      <span>{text}</span>
      <img src={close} alt=""/>
    </button>
  );
};

export default Chip;
