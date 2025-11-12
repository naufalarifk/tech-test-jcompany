"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

export default function NotFound() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-black dark:text-white mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-8"></div>
        </div>

        {/* Error Message */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mb-8">
            You can navigate back to the home page or explore other sections of
            the application.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="button-primary">
              Back to Users
            </Link>
            <button onClick={() => setTheme} className="button-secondary">
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
            Quick Links
          </h3>
          <nav className="space-y-2">
            <Link
              href="/users"
              className="block text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-white font-medium transition duration-200"
            >
              → Users
            </Link>
            <Link
              href="/posts"
              className="block text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-white font-medium transition duration-200"
            >
              → Posts
            </Link>
            <a
              href="mailto:support@example.com"
              className="block text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-white font-medium transition duration-200"
            >
              → Contact Support
            </a>
          </nav>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black dark:bg-neutral-950 text-white py-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-600">
            © 2025 User Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
