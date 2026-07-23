"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CoverSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { coverVariants, itemVariants } from "./animations";

import { formatDate } from "@/lib/utils/format-date";

export function CoverSection({ className }: CoverSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const couple = data?.couple;
  const events = data?.events;
  const firstEventDate = events?.[0]?.date;
  const guestName = data?.guest?.name || "Tamu Undangan"; // Placeholder since guest data isn't in mock yet

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handleOpenInvitation = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error("Audio play failed:", err));
    }
  };

  return (
    <section
      className={`relative w-full h-[100dvh] flex items-center justify-center overflow-hidden ${className || ""}`}
    >
      {/* Background Music Preparation */}
      <audio ref={audioRef} preload="auto" loop>
        <source
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2070&auto=format&fit=crop"
          alt="Wedding Cover Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-background/60 backdrop-blur-[2px]" />

      <Container className="relative z-10 h-full py-12 flex flex-col justify-between items-center text-center">
        <motion.div
          variants={coverVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center mt-12 gap-2"
        >
          <motion.div variants={itemVariants}>
            <Text size="sm" className="uppercase tracking-widest text-primary/80">
              The Wedding Of
            </Text>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Heading level={1} className="text-primary text-5xl md:text-7xl font-light mt-4">
              {couple?.groom?.nickname || "Groom"} & {couple?.bride?.nickname || "Bride"}
            </Heading>
          </motion.div>

          {firstEventDate && (
            <motion.div variants={itemVariants} className="mt-4">
              <Text className="text-lg md:text-xl font-medium tracking-wide text-foreground/90">
                {formatDate(firstEventDate)}
              </Text>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          variants={coverVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center mb-12 gap-6"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-1">
            <Text size="sm" className="text-muted-foreground">
              Dear Mr/Mrs/Ms,
            </Text>
            <Heading level={4} className="font-semibold text-foreground">
              {guestName}
            </Heading>
            <Text size="sm" className="text-muted-foreground/80 text-xs italic">
              We apologize if there is a mistake in writing your name or title.
            </Text>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              size="lg"
              className="rounded-full shadow-lg gap-2 group"
              onClick={handleOpenInvitation}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail-open group-hover:-translate-y-1 transition-transform"
              >
                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
              </svg>
              Open Invitation
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
