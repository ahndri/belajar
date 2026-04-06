"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Maximize2, Share2, Heart, Loader2 } from "lucide-react";

interface Photo {
  id: number;
  url: string;
  title: string;
  size: number;
  uploaded_at: string;
}

export default function PhotoGrid({ limit }: { limit?: number }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch("/api/photos");
        const data = await res.json();
        setPhotos(limit ? data.slice(0, limit) : data);
      } catch (err) {
        console.error("Failed to fetch photos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, [limit]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <p className="text-gray-500 animate-pulse">Memuat galeri terbaik untuk Anda...</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center glass rounded-3xl border border-white/5">
        <p className="text-gray-400">Belum ada foto yang tersimpan.</p>
        <p className="text-sm text-gray-500 mt-2">Mulai unggah foto pertama Anda!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <div key={photo.id} className="group relative aspect-[4/3] rounded-3xl overflow-hidden glass border border-white/5 card-hover">
          <Image
            src={photo.url}
            alt={photo.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-white font-bold text-lg">{photo.title}</h3>
                <span className="text-gray-400 text-xs">
                  {new Date(photo.uploaded_at).toLocaleDateString("id-ID", { 
                    day: 'numeric', month: 'short', year: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors">
                  <Heart className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors">
                  <Share2 className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-lg transition-colors">
                  <Maximize2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
