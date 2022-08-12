import React from "react";
import styles from "./CardLink.module.css";
import { Card } from "../Card";

type CardLinkProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const CardLink = ({ children, style }: CardLinkProps) => {
  return (
    <Card style={style}>
      <div>
        <a className={styles.card_link} />
      </div>
      {children}
    </Card>
  );
};

export { CardLink };
