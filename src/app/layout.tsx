import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aura Photo Storage | Premium Experience",
  description: "Experience your photos in a premium, modern, and high-performance gallery. Powered by Vercel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <Navbar />
        <main className="min-height-screen pt-20 px-6 sm:px-12 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
