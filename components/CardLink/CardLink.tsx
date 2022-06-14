import React from "react";
import Link from "next/link";
import styles from "./CardLink.module.css";
import { Card } from "../Card";

type CardLinkProps = {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const CardLink = ({ href, children, style }: CardLinkProps) => {
  return (
    <Card style={style}>
      <Link href={href}>
        <a className={styles.card_link} />
      </Link>
      {children}
    </Card>
  );
};

export { CardLink };
