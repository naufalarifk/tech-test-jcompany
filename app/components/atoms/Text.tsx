import React, { HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
}

export function Text({
  variant = "primary",
  className = "",
  children,
  ...props
}: TextProps) {
  const variants = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
  };

  return (
    <p className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </p>
  );
}
