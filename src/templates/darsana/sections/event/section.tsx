"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { EventSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { SectionTitle } from "@/components/typography/section-title";
import { Button } from "@/components/ui/button";
import { eventVariants, itemVariants } from "./animations";
import { MapPin, Calendar, Clock, Sparkles } from "lucide-react";

import { formatDate } from "@/lib/utils/format-date";

export function EventSection({ className }: EventSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const events = data?.events || [];

  if (!events.length) return null;

  return (
    <section className={`w-full py-14 sm:py-20 md:py-24 bg-muted/20 ${className || ""}`}>
      <Container>
        <motion.div
          variants={eventVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center w-full"
        >
          <SectionTitle title="Wedding Events" subtitle="Rangkaian Acara Bahagia" />

          <div className="grid grid-cols-1 @lg:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12 w-full max-w-md @lg:max-w-4xl mx-auto">
            {events.map(
              (
                event: Record<
                  string,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  any
                >,
                index: number
              ) => {
                const dateStr = event.date ? formatDate(event.date) : "Tanggal Acara";

                // Resolve exact time entered in editor
                let timeDisplay = "";
                if (event.time) {
                  timeDisplay = `${event.time} WIB`;
                } else if (event.startTime) {
                  timeDisplay = event.endTime
                    ? `${event.startTime} - ${event.endTime} WIB`
                    : `${event.startTime} WIB`;
                } else {
                  timeDisplay = "09:00 - Selesai WIB";
                }

                const locationName =
                  event.locationName || event.venue || event.location || "Lokasi Acara";
                const address = event.address || "Alamat lengkap acara pernikahan";
                const mapsUrl = event.mapsUrl || event.googleMapsUrl || event.mapUrl;

                return (
                  <motion.div
                    key={event.id || event.title || event.name || `event-${index}`}
                    variants={itemVariants}
                    className="w-full flex flex-col bg-card/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl shadow-xl shadow-black/5 border border-amber-500/20 text-center items-center relative overflow-hidden"
                  >
                    {/* Top Corner Glow */}
                    <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

                    {/* Icon Badge */}
                    <div className="w-13 h-13 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 shadow-xs">
                      <Sparkles className="w-6 h-6 text-amber-500" />
                    </div>

                    {/* Event Title */}
                    <Heading
                      level={3}
                      className="font-serif font-medium text-xl sm:text-2xl mb-2 text-foreground tracking-wide"
                    >
                      {event.title ||
                        event.name ||
                        (index === 0 ? "Akad Nikah" : "Resepsi Pernikahan")}
                    </Heading>

                    {/* Date & Time */}
                    <div className="flex flex-col items-center gap-1 my-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{dateStr}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground/80" />
                        <span>{timeDisplay}</span>
                      </div>
                    </div>

                    <div className="w-16 h-px bg-amber-500/30 my-4" />

                    {/* Location & Address */}
                    <Heading
                      level={5}
                      className="font-semibold text-sm sm:text-base text-foreground mb-1"
                    >
                      {locationName}
                    </Heading>
                    <Text
                      size="sm"
                      className="text-muted-foreground text-xs leading-relaxed max-w-xs mb-6"
                    >
                      {address}
                    </Text>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2.5 w-full mt-auto">
                      {mapsUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-full text-xs h-9 gap-1.5 border-amber-500/30 hover:bg-amber-500/10 text-foreground"
                          onClick={() => window.open(mapsUrl, "_blank")}
                        >
                          <MapPin className="w-3.5 h-3.5 text-amber-500" />
                          <span>Petunjuk Arah (Google Maps)</span>
                        </Button>
                      )}
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full rounded-full text-xs h-9 gap-1.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md shadow-amber-500/20"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Simpan ke Kalender</span>
                      </Button>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
