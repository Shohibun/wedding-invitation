"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StorySectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/typography/section-title";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { storyVariants, itemVariants } from "./animations";
import { formatDate } from "@/lib/utils/format-date";
import { Heart, Calendar } from "lucide-react";

export function StorySection({ className }: StorySectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const story = data?.story || [];

  if (!story.length) return null;

  return (
    <section className={`w-full py-14 sm:py-20 md:py-24 bg-muted/15 @container ${className || ""}`}>
      <Container>
        <motion.div
          variants={storyVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center w-full"
        >
          <SectionTitle title="Our Love Story" subtitle="Kisah Perjalanan Cinta Kami" />

          <div className="relative mt-8 sm:mt-12 w-full max-w-3xl mx-auto px-1 sm:px-2">
            {/* Center Timeline Golden Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute left-3.5 @lg:left-1/2 top-0 w-0.5 bg-linear-to-b from-amber-500/80 via-amber-500/40 to-amber-500/10 @lg:-translate-x-1/2"
            />

            <div className="flex flex-col gap-6 sm:gap-8 @lg:gap-10">
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
                  const storyImage = item.imageUrl || item.image || item.photoUrl;

                  return (
                    <motion.div
                      key={item.id || `story-${idx}`}
                      variants={itemVariants(direction)}
                      className={`relative flex flex-col @lg:flex-row items-start ${
                        isEven ? "@lg:flex-row-reverse" : ""
                      } pl-8 sm:pl-9 @lg:pl-0 w-full`}
                    >
                      {/* Glowing Golden Timeline Dot */}
                      <div className="absolute left-3.5 @lg:left-1/2 top-2 w-3.5 h-3.5 rounded-full bg-amber-500 -translate-x-1/2 ring-4 ring-background shadow-md shadow-amber-500/40 flex items-center justify-center z-10">
                        <Heart className="w-1.5 h-1.5 text-white fill-white" />
                      </div>

                      {/* Content Card */}
                      <div
                        className={`w-full @lg:w-[calc(50%-1.5rem)] flex flex-col bg-card/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-amber-500/20 shadow-md ${
                          isEven ? "@lg:mr-auto @lg:text-left" : "@lg:ml-auto @lg:text-left"
                        }`}
                      >
                        {storyImage && (
                          <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-3 border border-amber-500/20 shadow-xs group">
                            <Image
                              src={storyImage}
                              alt={item.title || "Story Photo"}
                              fill
                              unoptimized={storyImage.startsWith("data:")}
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium text-[10px] sm:text-xs tracking-wider uppercase w-fit whitespace-nowrap">
                            <Calendar className="w-2.5 h-2.5 text-amber-500" />
                            {formatDate(item.date, "MMMM yyyy")}
                          </span>
                        </div>

                        <Heading
                          level={4}
                          className="font-serif font-medium mb-1.5 text-foreground text-sm sm:text-base leading-snug"
                        >
                          {item.title}
                        </Heading>
                        <Text className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
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
