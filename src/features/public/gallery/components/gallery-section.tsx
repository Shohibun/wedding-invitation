"use client";
import * as React from "react";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GallerySection({ images = [] }: { images?: Record<string, any>[] }) {
  if (!images || images.length === 0) return null;
  return (
    <section className="py-24 px-6 bg-surface">
      <h2 className="text-4xl font-heading text-center text-primary mb-16">Galeri Momen</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map(img => (
          <div key={img.id} className="relative aspect-square overflow-hidden rounded-xl">
            <Image src={img.url} alt={img.alt || "Gallery Image"} fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}