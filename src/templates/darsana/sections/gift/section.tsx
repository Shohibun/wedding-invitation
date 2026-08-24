"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GiftSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/typography/section-title";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { giftVariants, cardVariants } from "./animations";
import { CreditCard, QrCode, Check, Copy, Sparkles } from "lucide-react";

export function GiftSection({ className }: GiftSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();

  // Support both gifts (plural) and gift (singular)
  const rawGifts = data?.gifts || data?.gift || [];
  const gifts = Array.isArray(rawGifts) ? rawGifts : [];

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!gifts.length) return null;

  return (
    <section className={`w-full py-14 sm:py-20 md:py-24 bg-muted/10 ${className || ""}`}>
      <Container>
        <motion.div
          variants={giftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center w-full"
        >
          <SectionTitle title="Wedding Gift" subtitle="Tanda Kasih & Amplop Digital" />

          <Text className="text-center max-w-lg text-muted-foreground text-xs sm:text-sm mt-3 mb-8 sm:mb-12 px-3 leading-relaxed">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda
            bermaksud memberikan tanda kasih, Anda dapat mengirimkannya melalui:
          </Text>

          <div className="grid grid-cols-1 @lg:grid-cols-2 gap-6 sm:gap-8 w-full max-w-md @lg:max-w-4xl mx-auto">
            {gifts.map(
              (
                gift: Record<
                  string,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  any
                >,
                index: number
              ) => {
                const uniqueId = gift.id || `gift-${index}`;
                const bankName = gift.bank || gift.bankName || "BCA / Bank";
                const accountNumber = gift.accountNumber || gift.number || "";
                const accountName = gift.accountName || gift.name || "Nama Penerima";
                const qrUrl = gift.qrCodeUrl || gift.qrUrl || gift.image;

                return (
                  <motion.div
                    key={uniqueId}
                    variants={cardVariants}
                    className="w-full flex flex-col bg-linear-to-br from-card via-card/90 to-amber-500/5 border border-amber-500/25 rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-xl shadow-black/5"
                  >
                    {/* Atmospheric Glow */}
                    <div className="absolute -right-8 -top-8 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Top Row: Bank Name + Chip */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                          {qrUrl ? (
                            <QrCode className="w-5 h-5" />
                          ) : (
                            <CreditCard className="w-5 h-5" />
                          )}
                        </div>
                        <Heading
                          level={4}
                          className="font-bold text-foreground text-base tracking-wider uppercase"
                        >
                          {bankName}
                        </Heading>
                      </div>

                      {/* Holographic Chip Visual */}
                      <div className="w-10 h-7 rounded-md bg-linear-to-tr from-amber-400 to-amber-200 border border-amber-300/80 shadow-xs flex items-center justify-center opacity-90">
                        <Sparkles className="w-3 h-3 text-amber-800" />
                      </div>
                    </div>

                    {/* QR Code Display if Available */}
                    {qrUrl && (
                      <div className="flex flex-col items-center justify-center my-2 p-4 bg-background/80 rounded-2xl border border-amber-500/20 shadow-inner">
                        <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-xl overflow-hidden shadow-md">
                          <Image
                            src={qrUrl}
                            alt="QR Code Gift"
                            fill
                            sizes="200px"
                            unoptimized={qrUrl.startsWith("data:")}
                            className="object-contain"
                          />
                        </div>
                        <span className="text-[11px] text-muted-foreground mt-2 font-medium">
                          Pindai untuk transfer QRIS / Bank
                        </span>
                      </div>
                    )}

                    {/* Account Number & Copy Button */}
                    {accountNumber && (
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 gap-3">
                        <div className="flex flex-col min-w-0">
                          <Text className="font-mono text-lg sm:text-xl font-bold tracking-wider text-foreground select-all">
                            {accountNumber}
                          </Text>
                          <Text
                            size="sm"
                            className="text-muted-foreground uppercase text-xs truncate"
                          >
                            a.n {accountName}
                          </Text>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full gap-1.5 text-xs h-8.5 px-3.5 border-amber-500/30 hover:bg-amber-500/10 text-foreground shrink-0 shadow-xs"
                          onClick={() => handleCopy(uniqueId, accountNumber)}
                        >
                          {copiedId === uniqueId ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                              <span>Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-amber-500" />
                              <span>Salin</span>
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </motion.div>
                );
              }
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
