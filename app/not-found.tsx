"use client";

import Link from "next/link";
import { Button } from "@/app/components";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-primary flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 mb-8 border border-primary">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-secondary text-lg mb-6">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <p className="text-tertiary text-sm mb-8">
            You can navigate back to the home page or explore other sections of
            the application.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="primary">Back to Users</Button>
            </Link>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6 border border-primary">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Quick Links
          </h3>
          <nav className="space-y-2">
            <Link href="/users" className="block link-primary">
              → Users
            </Link>
            <Link href="/posts" className="block link-primary">
              → Posts
            </Link>
            <a href="mailto:support@example.com" className="block link-primary">
              → Contact Support
            </a>
          </nav>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-footer text-white py-4 border-t border-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-tertiary">
            © 2025 User Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
