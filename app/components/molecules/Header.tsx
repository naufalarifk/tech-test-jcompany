import React from "react";
import { Heading } from "../atoms/Heading";
import { ThemeToggle } from "../atoms/ThemeToggle";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-neutral-900 shadow border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Heading level={1} className="text-2xl mb-0">
          {title}
        </Heading>
        <ThemeToggle />
      </nav>
    </header>
  );
}
