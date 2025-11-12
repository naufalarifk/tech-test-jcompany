import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "font-bold py-2 px-6 rounded-lg transition duration-200";

  const variants = {
    primary:
      "bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-black dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
    danger:
      "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white font-medium",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
