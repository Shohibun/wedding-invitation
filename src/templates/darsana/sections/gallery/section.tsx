"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { GallerySectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/typography/section-title";
import { galleryVariants } from "./animations";

export function GallerySection({ className }: GallerySectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const gallery = data?.gallery || [];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox]);

  if (!gallery.length) return null;

  return (
    <section
      className={`w-full py-14 sm:py-20 md:py-24 bg-background overflow-hidden ${className || ""}`}
    >
      <Container>
        <motion.div
          variants={galleryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center w-full"
        >
          <SectionTitle title="Our Gallery" subtitle="Galeri Momen Bahagia" />

          {/* Masonry Grid with guaranteed unique keys */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 mt-8 sm:mt-12 w-full max-w-6xl mx-auto space-y-3 sm:space-y-4">
            {gallery.map((img: { id?: string; url: string; alt?: string }, idx: number) => {
              const uniqueKey = img.id || img.url || `gallery-item-${idx}`;

              return (
                <div
                  key={uniqueKey}
                  className="relative w-full break-inside-avoid cursor-pointer overflow-hidden rounded-2xl group shadow-md border border-amber-500/15"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <div className="aspect-3/4 relative w-full overflow-hidden">
                    <Image
                      src={img.url}
                      alt={img.alt || `Gallery Image ${idx + 1}`}
                      fill
                      loading="lazy"
                      unoptimized={img.url.startsWith("data:")}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <span className="text-[10px] text-white/90 tracking-wider uppercase font-medium">
                        Lihat Foto
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <Swiper
              modules={[Navigation, Pagination, Keyboard]}
              initialSlide={lightboxIndex}
              navigation
              keyboard={{ enabled: true, onlyInViewport: false }}
              pagination={{ type: "fraction" }}
              className="w-full h-full max-w-7xl max-h-[90vh]"
            >
              {gallery.map((img: { id?: string; url: string; alt?: string }, idx: number) => {
                const swiperKey = img.id || img.url || `swiper-item-${idx}`;

                return (
                  <SwiperSlide
                    key={swiperKey}
                    className="flex items-center justify-center p-4 md:p-12"
                  >
                    <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                      <Image
                        src={img.url}
                        alt={img.alt || `Gallery Image ${idx + 1}`}
                        fill
                        loading="lazy"
                        unoptimized={img.url.startsWith("data:")}
                        className="object-contain"
                        sizes="100vw"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
