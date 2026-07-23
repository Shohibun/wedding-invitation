"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { EventSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { SectionTitle } from "@/components/typography/section-title";
import { Button } from "@/components/ui/button";
import { eventVariants, itemVariants } from "./animations";

import { formatDate } from "@/lib/utils/format-date";

export function EventSection({ className }: EventSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const events = data?.events || [];

  if (!events.length) return null;

  return (
    <section className={`w-full py-24 bg-muted/20 ${className || ""}`}>
      <Container>
        <motion.div
          variants={eventVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <SectionTitle title="Wedding Events" subtitle="Save the Date" />

          <Grid cols={1} className="md:grid-cols-2 gap-12 mt-16 w-full max-w-5xl mx-auto">
            {events.map(
              (
                event: Record<
                  string,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  any
                >
              ) => {
                const startDate = new Date(event.date);
                const endDate = new Date(event.endDate);
                const dateStr = formatDate(event.date);
                const timeStr = `${startDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} - ${endDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`;

                return (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    className="flex flex-col bg-background p-8 md:p-10 rounded-2xl shadow-sm border border-border/50 text-center items-center"
                  >
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-calendar-heart"
                      >
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <path d="M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.5" />
                        <path d="M3 10h18" />
                        <path d="M21.124 14.839c.56 1.059.52 2.455-.107 3.514l-2.673 4.518c-.467.79-1.619.79-2.086 0l-2.67-4.514a3.178 3.178 0 0 1-.11-3.518c.633-1.15 2-1.745 3.328-1.488a3.184 3.184 0 0 1 2.308-1.503c1.332-.163 2.658.554 3.31 1.849z" />
                      </svg>
                    </div>

                    <Heading level={3} className="font-light mb-4">
                      {event.name}
                    </Heading>

                    <Text className="font-medium text-foreground mb-1">{dateStr}</Text>
                    <Text className="text-muted-foreground mb-6">{timeStr}</Text>

                    <div className="w-12 h-px bg-border mb-6" />

                    <Heading level={5} className="font-medium mb-2">
                      {event.locationName}
                    </Heading>
                    <Text size="sm" className="text-muted-foreground mb-8 line-clamp-2">
                      {event.address}
                    </Text>

                    <div className="flex gap-4 mt-auto">
                      <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => window.open(event.mapUrl, "_blank")}
                      >
                        View Map
                      </Button>
                      <Button variant="default" className="rounded-full">
                        Add to Calendar
                      </Button>
                    </div>
                  </motion.div>
                );
              }
            )}
          </Grid>
        </motion.div>
      </Container>
    </section>
  );
}
