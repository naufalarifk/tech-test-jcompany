import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "inactive";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-gray-200 text-gray-900 dark:bg-neutral-800 dark:text-gray-100",
    success: "bg-gray-200 text-black dark:bg-neutral-800 dark:text-white",
    inactive:
      "bg-gray-300 text-gray-600 dark:bg-neutral-700 dark:text-gray-300",
  };

  return (
    <span
      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
