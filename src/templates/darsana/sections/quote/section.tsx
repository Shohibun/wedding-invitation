"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { QuoteSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { Text } from "@/components/typography/text";
import { quoteVariants } from "./animations";

export function QuoteSection({ className }: QuoteSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const quote = data?.quote;

  if (!quote) return null;

  return (
    <section className={`w-full py-16 md:py-24 bg-muted/30 ${className || ""}`}>
      <Container className="max-w-3xl flex flex-col items-center text-center">
        <motion.div
          variants={quoteVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center gap-6"
        >
          {/* Subtle quotation mark icon */}
          <svg
            className="w-10 h-10 text-primary/40"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <Text className="text-xl md:text-2xl italic leading-relaxed text-foreground font-light">
            &quot;{quote.text}&quot;
          </Text>

          <Text size="sm" className="font-medium tracking-widest text-primary uppercase mt-4">
            — {quote.author}
          </Text>
        </motion.div>
      </Container>
    </section>
  );
}
