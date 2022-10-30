import React from "react";

type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const Card = ({ children, style }: CardProps) => {
  return (
    <div
      className="border-2 border-[color:var(--grey)] rounded pt-8 pr-4 pb-4 pl-4 md:pr-8 md:pl-8"
      style={style}
    >
      {children}
    </div>
  );
};
export { Card };
