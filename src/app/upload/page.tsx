import React from "react";
import UploadZone from "@/components/UploadZone";

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-12 py-12">
      <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Unggah <span className="text-indigo-400 font-extrabold italic">Karya Seni</span> Anda.
        </h1>
        <p className="text-gray-400">
          Bagikan momen terbaik Anda ke penyimpanan yang aman dan cepat. Mendukung format JPEG, PNG, dan GIF hingga 5MB.
        </p>
      </div>
      
      <UploadZone />
    </div>
  );
}
