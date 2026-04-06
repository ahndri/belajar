"use client";

import React from "react";
import PhotoGrid from "@/components/PhotoGrid";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export default function GalleryPage() {
  return (
    <div className="flex flex-col gap-12 py-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-white tracking-tight">Semua Koleksi</h1>
          <p className="text-gray-500">Jelajahi setiap momen yang telah Anda abadikan.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Cari foto..." 
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <PhotoGrid />
      </motion.div>
    </div>
  );
}
