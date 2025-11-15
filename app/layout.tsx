import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { ReactNode } from "react";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "User Portal",
  description: "A simple user management portal",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={geist.className}>
      <head>
        <link rel="dns-prefetch" href="https://jsonplaceholder.typicode.com" />
        <link
          rel="preconnect"
          href="https://jsonplaceholder.typicode.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/css/app/layout.css"
          as="style"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
