"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CoupleSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { SectionTitle } from "@/components/typography/section-title";
import { coupleVariants, cardVariants } from "./animations";

export function CoupleSection({ className }: CoupleSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const couple = data?.couple;

  if (!couple) return null;

  return (
    <section className={`w-full py-24 bg-background overflow-hidden ${className || ""}`}>
      <Container>
        <motion.div
          variants={coupleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <SectionTitle title="The Happy Couple" subtitle="With the blessing of God" />

          <Grid cols={1} className="md:grid-cols-2 gap-16 md:gap-8 mt-16 w-full max-w-5xl mx-auto">
            {/* Groom */}
            <motion.div
              variants={cardVariants}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-64 h-80 rounded-t-full overflow-hidden mb-6 border-4 border-muted shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop"
                  alt={couple.groom?.fullName || "Groom"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
              <Heading level={3} className="font-light text-foreground mb-2">
                {couple.groom?.fullName}
              </Heading>
              <Text className="text-primary italic mb-2">{couple.groom?.parents}</Text>
              {couple.groom?.description && (
                <Text size="sm" className="text-muted-foreground mb-6 line-clamp-3">
                  {couple.groom.description}
                </Text>
              )}
              <a
                href={`https://instagram.com/${couple.groom?.instagram?.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                {couple.groom?.instagram}
              </a>
            </motion.div>

            {/* Bride */}
            <motion.div
              variants={cardVariants}
              className="flex flex-col items-center text-center group mt-12 md:mt-24"
            >
              <div className="relative w-64 h-80 rounded-t-full overflow-hidden mb-6 border-4 border-muted shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop"
                  alt={couple.bride?.fullName || "Bride"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
              <Heading level={3} className="font-light text-foreground mb-2">
                {couple.bride?.fullName}
              </Heading>
              <Text className="text-primary italic mb-2">{couple.bride?.parents}</Text>
              {couple.bride?.description && (
                <Text size="sm" className="text-muted-foreground mb-6 line-clamp-3">
                  {couple.bride.description}
                </Text>
              )}
              <a
                href={`https://instagram.com/${couple.bride?.instagram?.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                {couple.bride?.instagram}
              </a>
            </motion.div>
          </Grid>
        </motion.div>
      </Container>
    </section>
  );
}
