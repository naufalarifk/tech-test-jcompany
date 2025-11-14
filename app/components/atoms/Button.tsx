import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
  };

  return (
    <button
      className={`hover:cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
