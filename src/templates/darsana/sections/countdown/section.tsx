"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountdownSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { countdownVariants, boxVariants } from "./animations";

export function CountdownSection({ className }: CountdownSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const targetDateStr = data?.events?.[0]?.date;
  const targetDate = targetDateStr
    ? new Date(targetDateStr).getTime()
    : new Date().getTime() + 86400000 * 30; // 30 days default

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className={`w-full py-20 bg-primary text-primary-foreground ${className || ""}`}>
      <Container className="flex flex-col items-center text-center">
        <motion.div
          variants={countdownVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center gap-8 w-full max-w-2xl"
        >
          <Heading level={3} className="font-light tracking-wide">
            Menuju Hari Bahagia
          </Heading>

          <div className="flex justify-center gap-4 md:gap-8 w-full">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Menit", value: timeLeft.minutes },
              { label: "Detik", value: timeLeft.seconds },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={boxVariants}
                className="flex flex-col items-center justify-center bg-background/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-4 md:p-6 w-20 md:w-28 shadow-xl"
              >
                <div className="overflow-hidden h-[3rem] md:h-[4rem] flex items-center justify-center">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={item.value}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heading level={2} className="font-light m-0">
                        {item.value < 10 ? `0${item.value}` : item.value}
                      </Heading>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <Text
                  size="sm"
                  className="uppercase tracking-widest text-xs md:text-sm mt-2 opacity-80"
                >
                  {item.label}
                </Text>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
