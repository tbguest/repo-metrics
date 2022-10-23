import React from "react";

import styles from "./PlaceholderCard.module.css";

type CardProps = {
  children: React.ReactNode;
};

const PlaceholderCard = () => {
  return <div className={styles.card}></div>;
};

export { PlaceholderCard };
