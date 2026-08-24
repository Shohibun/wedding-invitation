"use client";
import * as React from "react";
import { motion } from "framer-motion";

export function OpeningSection({ quote }: { quote?: { text: string; author: string } }) {
  if (!quote) return null;
  
  return (
    <section className="py-24 px-6 bg-background text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto"
      >
        <p className="text-xl md:text-2xl text-textPrimary italic mb-6">&quot;{quote.text}&quot;</p>
        <p className="text-textSecondary font-semibold">{quote.author}</p>
      </motion.div>
    </section>
  );
}