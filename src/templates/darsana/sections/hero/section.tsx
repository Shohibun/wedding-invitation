"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HeroSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { heroVariants, itemVariants } from "./animations";

import { formatDate } from "@/lib/utils/format-date";

export function HeroSection({ className }: HeroSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const couple = data?.couple;
  const events = data?.events;
  const primaryEvent = events?.find((e: { id: string }) => e.id === "resepsi") || events?.[0];

  return (
    <section
      className={`relative w-full py-24 md:py-32 bg-background flex flex-col items-center justify-center overflow-hidden ${className || ""}`}
    >
      {/* Decorative Ornaments (SVGs or absolute positioned elements) */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <Container className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div variants={itemVariants}>
            <Text size="sm" className="uppercase tracking-widest text-primary font-medium">
              We Are Getting Married
            </Text>
          </motion.div>

          <motion.div variants={itemVariants} className="my-8 relative">
            {/* Minimalist divider/ornament */}
            <div className="w-px h-16 bg-linear-to-b from-transparent via-primary/50 to-transparent mx-auto mb-6" />

            <Heading
              level={2}
              className="text-4xl md:text-6xl font-light text-foreground leading-tight"
            >
              {couple?.groom?.fullName || "Groom Name"}
            </Heading>

            <Text className="text-3xl italic text-primary/70 my-2">&</Text>

            <Heading
              level={2}
              className="text-4xl md:text-6xl font-light text-foreground leading-tight"
            >
              {couple?.bride?.fullName || "Bride Name"}
            </Heading>

            <div className="w-px h-16 bg-linear-to-b from-transparent via-primary/50 to-transparent mx-auto mt-6" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Text className="text-muted-foreground leading-relaxed">
              With the grace and blessing of God, we cordially invite you to share our joy and
              celebrate our wedding day.
            </Text>
          </motion.div>

          {primaryEvent && (
            <motion.div variants={itemVariants} className="mt-8 flex flex-col items-center gap-2">
              <Text className="text-xl font-medium text-foreground">
                {formatDate(primaryEvent.date)}
              </Text>
              <Text className="text-sm text-muted-foreground uppercase tracking-widest">
                {primaryEvent.locationName}
              </Text>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
