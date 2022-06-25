import React from "react";

import styles from "./Card.module.css";
import { IoMdArrowDropdown } from "react-icons/io";
import classNames from "classnames";

type CardProps = {
  children: React.ReactNode;
  onClick: () => void;
  open: boolean;
  style?: React.CSSProperties;
};

const Card = ({ children, onClick, open, style }: CardProps) => {
  return (
    <div className={styles.card} style={style} onClick={onClick}>
      {children}
      <div
        className={classNames({
          [styles.prompt]: !open,
          [styles.prompt_hidden]: open,
        })}
      >
        show commits
        <IoMdArrowDropdown />
      </div>
    </div>
  );
};

export { Card };
