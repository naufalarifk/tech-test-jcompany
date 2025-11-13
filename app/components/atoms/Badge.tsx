import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "inactive";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "badge-default",
    success: "badge-success",
    inactive: "badge-inactive",
  };

  return <span className={variants[variant]}>{children}</span>;
}
