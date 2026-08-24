"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HeroSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { heroVariants, itemVariants } from "./animations";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { formatDate } from "@/lib/utils/format-date";

export function HeroSection({ className }: HeroSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const couple = data?.couple;
  const events = data?.events;
  const primaryEvent = events?.[0];

  const groomName = couple?.groom?.fullName || couple?.groom?.nickname || "Groom";
  const brideName = couple?.bride?.fullName || couple?.bride?.nickname || "Bride";

  return (
    <section
      className={`relative w-full py-16 sm:py-24 md:py-32 bg-linear-to-b from-background via-muted/20 to-background flex flex-col items-center justify-center overflow-hidden border-b border-border/40 ${className || ""}`}
    >
      {/* Luxurious Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center text-center max-w-2xl px-4">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center gap-5 sm:gap-7 w-full"
        >
          {/* Top Royal Pill Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium shadow-xs"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>The Wedding Celebration</span>
          </motion.div>

          {/* Couple Names in Golden Serif Typography */}
          <motion.div variants={itemVariants} className="my-2 sm:my-4 relative w-full">
            {/* Top Ornamental Divider */}
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <div className="w-12 sm:w-20 h-px bg-linear-to-r from-transparent via-amber-500/50 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
              <div className="w-12 sm:w-20 h-px bg-linear-to-r from-transparent via-amber-500/50 to-transparent" />
            </div>

            <Heading
              level={2}
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-foreground tracking-wide leading-tight"
            >
              {groomName}
            </Heading>

            <div className="my-2 sm:my-3 flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-amber-500/30" />
              <span className="text-xl sm:text-2xl md:text-3xl font-serif italic text-amber-500/90">
                &
              </span>
              <div className="w-8 h-px bg-amber-500/30" />
            </div>

            <Heading
              level={2}
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-foreground tracking-wide leading-tight"
            >
              {brideName}
            </Heading>

            {/* Bottom Ornamental Divider */}
            <div className="flex items-center justify-center gap-3 mt-4 sm:mt-6">
              <div className="w-12 sm:w-20 h-px bg-linear-to-r from-transparent via-amber-500/50 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
              <div className="w-12 sm:w-20 h-px bg-linear-to-r from-transparent via-amber-500/50 to-transparent" />
            </div>
          </motion.div>

          {/* Romantic Greeting Quote */}
          <motion.div variants={itemVariants}>
            <Text className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed max-w-md mx-auto italic font-serif">
              &ldquo;Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang
              Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia pernikahan kami.&rdquo;
            </Text>
          </motion.div>

          {/* Primary Event Date & Venue Badge Card */}
          {primaryEvent && (
            <motion.div
              variants={itemVariants}
              className="mt-2 sm:mt-4 p-3.5 sm:p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-amber-500/20 shadow-lg shadow-amber-500/5 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-6"
            >
              <div className="flex items-center gap-2 text-foreground font-medium text-xs sm:text-sm">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{formatDate(primaryEvent.date)}</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate max-w-50">
                  {primaryEvent.locationName || primaryEvent.venue || "Lokasi Acara"}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
