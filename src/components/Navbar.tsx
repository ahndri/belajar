"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, Upload, LayoutGrid, Search } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 premium-gradient rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Aura Store
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">
            Gallery
          </Link>
          <Link href="/upload" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">
            Upload
          </Link>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-all duration-200 shadow-xl active:scale-95">
            <Upload className="w-4 h-4" />
            Sign In
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden items-center gap-4">
          <Search className="w-5 h-5 text-gray-400" />
          <LayoutGrid className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </nav>
  );
}
