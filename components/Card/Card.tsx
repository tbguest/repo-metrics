import React from "react";

import styles from "./Card.module.css";

type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const Card = ({ children, style }: CardProps) => {
  return (
    <div className={styles.card} style={style}>
      {/* <button className={styles.close} onClick={() => onClose(repo.id)}> */}
      {/* <div className={styles.close}>
        <button onClick={() => onClose(repo.id)}>Remove</button>
      </div> */}
      {children}
    </div>
  );
};

export { Card };
