import React from "react";
import { Heading } from "../atoms/Heading";
import { ThemeToggle } from "../atoms/ThemeToggle";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-header shadow border-b border-primary">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Heading level={1} className="text-2xl mb-0">
          {title}
        </Heading>
        <ThemeToggle />
      </nav>
    </header>
  );
}
