"use client";

import React, { useState, useCallback } from "react";
import { Upload, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { put } from "@vercel/blob";

interface FileWithStatus {
  file: File;
  status: "idle" | "uploading" | "success" | "error";
  error?: string;
  url?: string;
}

export default function UploadZone() {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    setFiles(prev => [...prev, ...droppedFiles.map(f => ({ file: f, status: "idle" as const }))]);
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadAll = async () => {
    const updatedFiles = [...files];
    
    for (let i = 0; i < updatedFiles.length; i++) {
      if (updatedFiles[i].status === "success") continue;
      
      updatedFiles[i].status = "uploading";
      setFiles([...updatedFiles]);

      try {
        const response = await fetch(`/api/upload?filename=${updatedFiles[i].file.name}`, {
          method: 'POST',
          body: updatedFiles[i].file,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Gagal mengunggah ke Vercel Blob.");
        }
        
        const newBlob = data;
        
        // Store metadata in Postgres
        const pgResponse = await fetch('/api/photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: newBlob.url,
            title: updatedFiles[i].file.name.split('.')[0], // Simple title from filename
            size: updatedFiles[i].file.size,
          }),
        });

        const pgData = await pgResponse.json();
        if (!pgResponse.ok) {
           throw new Error(pgData.error || "Gagal menyimpan metadata ke database.");
        }

        updatedFiles[i].status = "success";
        updatedFiles[i].url = newBlob.url;
      } catch (err: any) {
        updatedFiles[i].status = "error";
        updatedFiles[i].error = err.message || "Gagal mengunggah.";
      }
      setFiles([...updatedFiles]);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto py-12">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl transition-all duration-300 ${
          isDragging ? "border-indigo-500 bg-indigo-500/5 scale-[1.02]" : "border-white/10 bg-white/5 hover:bg-white/10"
        }`}
      >
        <div className="bg-indigo-500/20 p-6 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
          <Upload className="w-10 h-10 text-indigo-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Unggah Foto Anda</h3>
        <p className="text-gray-400 text-center max-w-xs">
          Seret dan letakkan foto di sini, atau <span className="text-indigo-400 font-semibold cursor-pointer">pilih berkas</span>.
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => {
            const selectedFiles = Array.from(e.target.files || []).filter(f => f.type.startsWith("image/"));
            setFiles(prev => [...prev, ...selectedFiles.map(f => ({ file: f, status: "idle" as const }))]);
          }}
        />
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-white font-bold">Daftar Unggahan ({files.length})</h4>
            <button
              onClick={uploadAll}
              className="px-6 py-2 premium-gradient text-white text-sm font-bold rounded-xl hover:scale-105 transition-all shadow-lg active:scale-95"
            >
              Mulai Unggah Semua
            </button>
          </div>

          <div className="grid gap-3">
            {files.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 p-4 glass rounded-2xl border border-white/5 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden flex items-center justify-center">
                      <div className="w-full h-full bg-indigo-500/20 flex items-center justify-center">
                        <Upload className="w-4 h-4 text-indigo-400" />
                      </div>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-white text-sm font-medium truncate">{item.file.name}</span>
                      <span className="text-gray-500 text-xs">{(item.file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {item.status === "uploading" && <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />}
                    {item.status === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    {item.status === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
                    
                    {item.status === "idle" && (
                      <button
                        onClick={() => removeFile(index)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>

                {item.status === "error" && item.error && (
                  <div className="mt-2 flex items-start gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-xl animate-in fade-in slide-in-from-top-1 duration-300">
                    <AlertCircle className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-red-400 font-medium leading-tight">
                      {item.error}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
