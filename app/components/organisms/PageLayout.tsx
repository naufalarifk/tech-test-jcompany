import { ReactNode } from "react";
import { Header } from "@/app/components/molecules/Header";
import { Footer } from "@/app/components/molecules/Footer";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Header title={title} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
