import React from "react";

import styles from "./Card.module.css";

type CardProps = {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
};

const Card = ({ children, onClick, style }: CardProps) => {
  return (
    <div className={styles.card} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

export { Card };
