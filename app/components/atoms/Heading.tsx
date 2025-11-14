import React, { HTMLAttributes, ReactNode } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

export function Heading({
  level,
  children,
  className = "",
  ...props
}: HeadingProps) {
  const baseStyles = "text-primary font-bold";

  const sizes = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
    5: "text-lg",
    6: "text-base",
  };

  const Tag = `h${level}` as const;

  return (
    <Tag className={`${baseStyles} ${sizes[level]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
