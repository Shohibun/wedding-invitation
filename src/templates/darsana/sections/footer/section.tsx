"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FooterSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { Text } from "@/components/typography/text";
import { Heart } from "lucide-react";

export function FooterSection({ className }: FooterSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const couple = data?.couple;

  return (
    <footer
      className={`w-full py-12 sm:py-16 bg-card border-t border-amber-500/20 text-foreground relative overflow-hidden ${className || ""}`}
    >
      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <Container className="flex flex-col items-center text-center px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-1">
            <Heart className="w-4 h-4 fill-amber-500" />
          </div>

          <Text
            size="sm"
            className="uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 text-[10px] sm:text-xs font-semibold"
          >
            Terima Kasih Atas Doa & Restu Anda
          </Text>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-foreground tracking-wide mt-1 mb-2">
            {couple?.groom?.nickname || "Groom"} & {couple?.bride?.nickname || "Bride"}
          </h2>

          <div className="w-16 h-px bg-amber-500/30 my-2" />

          <Text size="sm" className="text-muted-foreground text-[10px] sm:text-xs tracking-wider">
            © {new Date().getFullYear()} Darsana Royal Wedding. All rights reserved.
          </Text>
        </motion.div>
      </Container>
    </footer>
  );
}
