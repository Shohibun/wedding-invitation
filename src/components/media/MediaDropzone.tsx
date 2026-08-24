"use client";

import React, { useRef, useState, DragEvent } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaDropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export function MediaDropzone({
  onFileSelect,
  accept,
  className,
  children,
  disabled,
}: MediaDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
      // Reset input so the same file can be selected again if needed
      e.target.value = "";
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative flex flex-col items-center justify-center w-full min-h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
        isDragging ? "border-primary bg-primary/5" : "border-border hover:bg-surfaceMuted",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
        disabled={disabled}
      />

      {children || (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <UploadCloud className="w-8 h-8 mb-2 text-textMuted" />
          <p className="text-sm font-medium text-text">Click or drag file to this area to upload</p>
          <p className="text-xs text-textMuted mt-1">Support for a single or bulk upload.</p>
        </div>
      )}
    </div>
  );
}
