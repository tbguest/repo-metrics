import React from "react";
import Link from "next/link";
import styles from "./CardLink.module.css";
import { Card } from "../Card";

type CardLinkProps = {
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const CardLink = ({ onClick, children, style }: CardLinkProps) => {
  return (
    <Card onClick={onClick} style={style}>
      <div>
        <a className={styles.card_link} />
      </div>
      {children}
    </Card>
  );
};

export { CardLink };
