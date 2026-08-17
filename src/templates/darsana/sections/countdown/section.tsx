"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CountdownSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { countdownVariants } from "./animations";
import { Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownSection({ className }: CountdownSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const events = data?.events;
  const targetDateStr = events?.[0]?.date || new Date().toISOString();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDateStr) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  const timeUnits = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section
      className={`w-full py-12 sm:py-16 md:py-20 bg-linear-to-b from-background via-muted/20 to-background ${className || ""}`}
    >
      <Container className="flex flex-col items-center">
        <motion.div
          variants={countdownVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center text-center w-full max-w-lg"
        >
          {/* Header */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-6 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Menghitung Hari</span>
          </div>

          {/* 4 Timer Boxes (Fit side by side perfectly on all mobile viewports) */}
          <div className="flex justify-center gap-2 sm:gap-3.5 w-full">
            {timeUnits.map((unit, idx) => (
              <div
                key={idx}
                className="flex-1 max-w-19 sm:max-w-22 flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-2xl bg-card/90 backdrop-blur-md border border-amber-500/25 shadow-lg shadow-black/5"
              >
                <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[9px] sm:text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
