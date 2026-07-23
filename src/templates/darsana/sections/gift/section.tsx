"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { GiftSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { SectionTitle } from "@/components/typography/section-title";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { giftVariants, cardVariants } from "./animations";

export function GiftSection({ className }: GiftSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const gifts = data?.gifts || [];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!gifts.length) return null;

  return (
    <section className={`w-full py-24 bg-background ${className || ""}`}>
      <Container>
        <motion.div
          variants={giftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <SectionTitle title="Wedding Gift" subtitle="Share your blessing" />

          <Text className="text-center max-w-xl text-muted-foreground mt-4 mb-12">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda
            bermaksud memberikan tanda kasih, Anda dapat mengirimkannya melalui:
          </Text>

          <Grid cols={1} className="md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
            {gifts.map(
              (
                gift: Record<
                  string,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  any
                >
              ) => {
                if (gift.type === "qr") {
                  return (
                    <motion.div
                      key={gift.id}
                      variants={cardVariants}
                      className="flex flex-col bg-muted/20 border border-border/50 rounded-2xl p-8 relative overflow-hidden shadow-sm items-center text-center"
                    >
                      <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />

                      <Heading
                        level={4}
                        className="font-bold text-foreground mb-6 uppercase tracking-wider"
                      >
                        {gift.bank}
                      </Heading>

                      <div className="w-48 h-48 bg-background border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center mb-6 relative group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-qr-code text-muted-foreground mb-2"
                        >
                          <rect width="5" height="5" x="3" y="3" rx="1" />
                          <rect width="5" height="5" x="16" y="3" rx="1" />
                          <rect width="5" height="5" x="3" y="16" rx="1" />
                          <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                          <path d="M21 21v.01" />
                          <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                          <path d="M3 12h.01" />
                          <path d="M12 3h.01" />
                          <path d="M12 16v.01" />
                          <path d="M16 12h1" />
                          <path d="M21 12v.01" />
                          <path d="M12 21v-1" />
                        </svg>
                        <Text size="sm" className="text-muted-foreground text-xs px-4">
                          QR Code will appear here
                        </Text>
                      </div>

                      <Text size="sm" className="text-muted-foreground uppercase">
                        a.n {gift.accountName}
                      </Text>
                    </motion.div>
                  );
                }

                // Bank Transfer Card
                return (
                  <motion.div
                    key={gift.id}
                    variants={cardVariants}
                    className="flex flex-col bg-muted/20 border border-border/50 rounded-2xl p-8 relative overflow-hidden shadow-sm"
                  >
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />

                    <Heading
                      level={4}
                      className="font-bold text-foreground mb-6 uppercase tracking-wider"
                    >
                      {gift.bank}
                    </Heading>

                    <div className="flex justify-between items-end mt-auto">
                      <div className="flex flex-col gap-1">
                        <Text className="font-mono text-xl tracking-widest text-foreground">
                          {gift.accountNumber}
                        </Text>
                        <Text size="sm" className="text-muted-foreground uppercase">
                          a.n {gift.accountName}
                        </Text>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full flex items-center gap-2"
                        onClick={() => handleCopy(gift.id, gift.accountNumber)}
                      >
                        {copiedId === gift.id ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-check text-primary"
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            Copied
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-copy"
                            >
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                            Copy
                          </>
                        )}
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
