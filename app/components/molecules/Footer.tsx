import React from "react";

interface FooterProps {
  year?: number;
}

export function Footer({ year = 2025 }: FooterProps) {
  return (
    <footer className="bg-footer text-white mt-12 border-t border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-tertiary">
          © {year} User Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
