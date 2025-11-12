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
    primary: "text-black dark:text-white",
    secondary: "text-gray-600 dark:text-gray-400",
    tertiary: "text-gray-500 dark:text-gray-500",
  };

  return (
    <p className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </p>
  );
}
