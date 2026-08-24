"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { StorySectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/typography/section-title";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { storyVariants, itemVariants } from "./animations";
import { formatDate } from "@/lib/utils/format-date";
import { Heart } from "lucide-react";

export function StorySection({ className }: StorySectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const story = data?.story || [];

  if (!story.length) return null;

  return (
    <section className={`w-full py-14 sm:py-20 md:py-24 bg-muted/15 ${className || ""}`}>
      <Container>
        <motion.div
          variants={storyVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center w-full"
        >
          <SectionTitle title="Our Love Story" subtitle="Kisah Perjalanan Cinta Kami" />

          <div className="relative mt-8 sm:mt-14 w-full max-w-3xl mx-auto px-2">
            {/* Center Timeline Golden Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-4 sm:left-6 md:left-1/2 top-0 w-0.5 bg-linear-to-b from-amber-500/80 via-amber-500/40 to-amber-500/10 md:-translate-x-1/2"
            />

            <div className="flex flex-col gap-8 sm:gap-12">
              {story.map(
                (
                  item: Record<
                    string,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    any
                  >,
                  idx: number
                ) => {
                  const isEven = idx % 2 === 0;
                  const direction = isEven ? "left" : "right";

                  return (
                    <motion.div
                      key={item.id || `story-${idx}`}
                      variants={itemVariants(direction)}
                      className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""} pl-11 sm:pl-14 md:pl-0`}
                    >
                      {/* Glowing Golden Timeline Dot */}
                      <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 w-4 h-4 rounded-full bg-amber-500 -translate-x-1/2 ring-4 ring-background shadow-md shadow-amber-500/40 flex items-center justify-center">
                        <Heart className="w-2 h-2 text-white fill-white" />
                      </div>

                      {/* Content Card */}
                      <div
                        className={`w-full md:w-1/2 flex flex-col bg-card/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-amber-500/20 shadow-md ${isEven ? "md:mr-8 md:text-left" : "md:ml-8 md:text-left"}`}
                      >
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-[10px] tracking-wider uppercase mb-1.5 w-fit">
                          {formatDate(item.date, "MMMM yyyy")}
                        </span>
                        <Heading
                          level={4}
                          className="font-serif font-medium mb-1.5 text-foreground text-sm sm:text-base"
                        >
                          {item.title}
                        </Heading>
                        <Text className="text-muted-foreground leading-relaxed text-xs">
                          {item.description}
                        </Text>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
