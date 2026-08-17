"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { QuoteSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { Text } from "@/components/typography/text";
import { quoteVariants } from "./animations";
import { Quote } from "lucide-react";

export function QuoteSection({ className }: QuoteSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const quote = data?.quote;

  if (!quote) return null;

  return (
    <section
      className={`w-full py-14 sm:py-20 md:py-24 bg-linear-to-b from-background via-muted/20 to-background ${className || ""}`}
    >
      <Container className="max-w-2xl flex flex-col items-center text-center px-4">
        <motion.div
          variants={quoteVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center gap-4 sm:gap-6 bg-card/60 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-amber-500/20 shadow-xl shadow-black/5"
        >
          {/* Golden Quote Icon */}
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <Quote className="w-5 h-5" />
          </div>

          <Text className="text-sm sm:text-base md:text-lg italic leading-relaxed text-foreground font-serif font-light max-w-lg">
            &ldquo;{quote.text}&rdquo;
          </Text>

          <div className="w-12 h-px bg-amber-500/30" />

          <Text
            size="sm"
            className="font-semibold tracking-widest text-amber-600 dark:text-amber-400 uppercase text-[11px] sm:text-xs"
          >
            {quote.author}
          </Text>
        </motion.div>
      </Container>
    </section>
  );
}
