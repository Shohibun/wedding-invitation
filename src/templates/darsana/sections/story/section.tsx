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

export function StorySection({ className }: StorySectionProps) {
  const data =
    useTemplateData<
      Record<string, any>
    > /* eslint-disable-line @typescript-eslint/no-explicit-any */();
  const story = data?.story || [];

  if (!story.length) return null;

  return (
    <section className={`w-full py-24 bg-muted/10 ${className || ""}`}>
      <Container>
        <motion.div
          variants={storyVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <SectionTitle title="Our Story" subtitle="How it all began" />

          <div className="relative mt-16 w-full max-w-4xl mx-auto">
            {/* Center Timeline Line with animation */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-[24px] md:left-1/2 top-0 w-px bg-border/80 md:-translate-x-1/2"
            />

            <div className="flex flex-col gap-12">
              {story.map(
                (
                  item: Record<
                    string,
                    any
                  > /* eslint-disable-line @typescript-eslint/no-explicit-any */,
                  idx: number
                ) => {
                  const isEven = idx % 2 === 0;
                  // isEven = left side in desktop (actually depends on layout).
                  // Let's see: isEven -> md:flex-row-reverse. In row-reverse, the content box is on the left side, the dot is in the center.
                  // If it's on the left side, it should slide in from the left ("left").
                  // If not even (odd), it's flex-row, content is on the right side. It should slide in from the right ("right").
                  const direction = isEven ? "left" : "right";

                  return (
                    <motion.div
                      key={item.id}
                      variants={itemVariants(direction)}
                      className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""} pl-16 md:pl-0`}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-[24px] md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary -translate-x-[7px] md:-translate-x-1/2 ring-4 ring-background" />

                      {/* Content Box */}
                      <div
                        className={`w-full md:w-1/2 flex flex-col ${isEven ? "md:pl-12 md:items-start md:text-left" : "md:pr-12 md:items-end md:text-right"}`}
                      >
                        <Text
                          size="sm"
                          className="text-primary font-bold tracking-wider uppercase mb-2"
                        >
                          {formatDate(item.date, "MMMM yyyy")}
                        </Text>
                        <Heading level={4} className="font-light mb-3 text-foreground">
                          {item.title}
                        </Heading>
                        <Text className="text-muted-foreground leading-relaxed">
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
