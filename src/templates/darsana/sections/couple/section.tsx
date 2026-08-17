"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CoupleSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { SectionTitle } from "@/components/typography/section-title";
import { coupleVariants, cardVariants } from "./animations";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || "w-3.5 h-3.5"}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function CoupleSection({ className }: CoupleSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const couple = data?.couple;

  if (!couple) return null;

  const groomPhoto =
    couple.groom?.photoUrl ||
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop";

  const bridePhoto =
    couple.bride?.photoUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop";

  return (
    <section
      className={`w-full py-14 sm:py-20 md:py-24 bg-background overflow-hidden ${className || ""}`}
    >
      <Container>
        <motion.div
          variants={coupleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center w-full"
        >
          <SectionTitle title="Mempelai Bahagia" subtitle="The Happy Couple" />

          <div className="grid grid-cols-1 @lg:grid-cols-2 gap-8 sm:gap-12 mt-8 sm:mt-12 w-full max-w-md @lg:max-w-5xl mx-auto">
            {/* Groom Card */}
            <motion.div
              variants={cardVariants}
              className="flex flex-col items-center text-center group bg-card/60 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-amber-500/20 shadow-xl shadow-black/5"
            >
              {/* Arched Portrait Frame */}
              <div className="relative w-44 sm:w-56 md:w-60 h-56 sm:h-72 md:h-76 rounded-t-full rounded-b-2xl overflow-hidden mb-5 border-4 border-amber-500/30 shadow-xl group-hover:border-amber-500/60 transition-colors">
                <Image
                  src={groomPhoto}
                  alt={couple.groom?.fullName || "Groom"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={groomPhoto.startsWith("data:")}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <Heading
                level={3}
                className="font-serif font-medium text-foreground text-xl sm:text-2xl mb-1.5 tracking-wide"
              >
                {couple.groom?.fullName || couple.groom?.nickname || "Groom Name"}
              </Heading>

              <div className="inline-block px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-serif italic mb-2">
                Mempelai Pria
              </div>

              <Text className="text-muted-foreground text-xs sm:text-sm mb-2 max-w-xs">
                {couple.groom?.parents ? `Putra dari ${couple.groom.parents}` : "Putra tercinta"}
              </Text>

              {couple.groom?.description && (
                <Text
                  size="sm"
                  className="text-muted-foreground/80 text-xs mb-4 line-clamp-3 max-w-xs italic font-serif"
                >
                  &ldquo;{couple.groom.description}&rdquo;
                </Text>
              )}

              {couple.groom?.instagram && (
                <a
                  href={`https://instagram.com/${couple.groom.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-muted/60 hover:bg-amber-500/10 border border-border text-foreground hover:text-amber-500 transition-all text-xs"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>{couple.groom.instagram}</span>
                </a>
              )}
            </motion.div>

            {/* Bride Card */}
            <motion.div
              variants={cardVariants}
              className="flex flex-col items-center text-center group bg-card/60 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-amber-500/20 shadow-xl shadow-black/5"
            >
              {/* Arched Portrait Frame */}
              <div className="relative w-44 sm:w-56 md:w-60 h-56 sm:h-72 md:h-76 rounded-t-full rounded-b-2xl overflow-hidden mb-5 border-4 border-amber-500/30 shadow-xl group-hover:border-amber-500/60 transition-colors">
                <Image
                  src={bridePhoto}
                  alt={couple.bride?.fullName || "Bride"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={bridePhoto.startsWith("data:")}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <Heading
                level={3}
                className="font-serif font-medium text-foreground text-xl sm:text-2xl mb-1.5 tracking-wide"
              >
                {couple.bride?.fullName || couple.bride?.nickname || "Bride Name"}
              </Heading>

              <div className="inline-block px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-serif italic mb-2">
                Mempelai Wanita
              </div>

              <Text className="text-muted-foreground text-xs sm:text-sm mb-2 max-w-xs">
                {couple.bride?.parents ? `Putri dari ${couple.bride.parents}` : "Putri tercinta"}
              </Text>

              {couple.bride?.description && (
                <Text
                  size="sm"
                  className="text-muted-foreground/80 text-xs mb-4 line-clamp-3 max-w-xs italic font-serif"
                >
                  &ldquo;{couple.bride.description}&rdquo;
                </Text>
              )}

              {couple.bride?.instagram && (
                <a
                  href={`https://instagram.com/${couple.bride.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-muted/60 hover:bg-amber-500/10 border border-border text-foreground hover:text-amber-500 transition-all text-xs"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>{couple.bride.instagram}</span>
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
