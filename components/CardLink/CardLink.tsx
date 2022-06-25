import React from "react";
import Link from "next/link";
import styles from "./CardLink.module.css";
import { Card } from "../Card";

type CardLinkProps = {
  onClick: () => void;
  open: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const CardLink = ({ onClick, open, children, style }: CardLinkProps) => {
  return (
    <Card onClick={onClick} open={open} style={style}>
      <div>
        <a className={styles.card_link} />
      </div>
      {children}
    </Card>
  );
};

export { CardLink };
