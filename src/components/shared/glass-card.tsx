"use client";
import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export const GlassCard = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-background/60 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden",
          className
        )}
        {...props}
      />
    );
  }
);
GlassCard.displayName = "GlassCard";
