"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon, Sparkles, Shield, Zap } from "lucide-react";
import PhotoGrid from "@/components/PhotoGrid";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 py-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wider uppercase"
        >
          <Sparkles className="w-3 h-3" />
          Powered by Vercel
        </motion.div>
        
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white leading-tight">
          Penyimpanan Foto <br />
          <motion.span 
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_auto]"
          >
            Masa Depan.
          </motion.span>
        </h1>
        
        <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
          Simpan, kelola, dan bagikan koleksi foto Anda dengan antarmuka yang elegan, performa tinggi, dan keamanan tingkat lanjut.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Link
            href="/upload"
            className="flex items-center gap-2 px-8 py-4 premium-gradient text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95"
          >
            Mulai Unggah
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/5 transition-all duration-300 active:scale-95">
            Pelajari Fitur
          </button>
        </div>

        {/* Stats / Features Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 w-full">
          {[
            { icon: Zap, color: "text-indigo-400", title: "Super Cepat", desc: "Optimasi gambar otomatis untuk setiap perangkat." },
            { icon: Shield, color: "text-purple-400", title: "Sangat Aman", desc: "Enkripsi tingkat tinggi dan infrastruktur Vercel." },
            { icon: ImageIcon, color: "text-pink-400", title: "Intuitive UI", desc: "Desain modern yang memanjakan mata Anda." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-2 p-6 rounded-3xl glass border border-white/5"
            >
              <feature.icon className={`w-8 h-8 ${feature.color} mb-2`} />
              <h3 className="font-bold text-white">{feature.title}</h3>
              <p className="text-xs text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Gallery Highlight */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-12"
      >
        <div className="flex items-end justify-between px-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-white">Galeri Anda</h2>
            <p className="text-gray-500">Tampilan terkini dari koleksi foto yang tersimpan.</p>
          </div>
          <Link href="/gallery" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
            Lihat Semua
          </Link>
        </div>
        
        <PhotoGrid limit={6} />
      </motion.section>
    </div>
  );
}
