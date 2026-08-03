"use client";
import * as React from "react";
import { motion } from "framer-motion";

export function HeroSection({ title, date }: { title: string; date: string }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-surface text-center p-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10"
      >
        <p className="text-sm tracking-widest uppercase mb-4 text-primary">The Wedding Of</p>
        <h1 className="text-5xl md:text-7xl font-heading text-textPrimary mb-6 font-bold">{title}</h1>
        <p className="text-lg md:text-xl text-textSecondary font-light">{date}</p>
      </motion.div>
    </section>
  );
}