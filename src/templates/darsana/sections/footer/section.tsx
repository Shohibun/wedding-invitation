"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FooterSectionProps } from "./types";
import { useTemplateData } from "@/templates/core/hooks";
import { Container } from "@/components/layout/container";
import { Text } from "@/components/typography/text";

export function FooterSection({ className }: FooterSectionProps) {
  const data =
    useTemplateData<
      Record<string, any>
    > /* eslint-disable-line @typescript-eslint/no-explicit-any */();
  const couple = data?.couple;

  return (
    <footer className={`w-full py-12 bg-primary text-primary-foreground ${className || ""}`}>
      <Container className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <Text size="sm" className="uppercase tracking-widest text-primary-foreground/70">
            Terima Kasih
          </Text>

          <h2 className="text-3xl font-light mt-2 mb-6">
            {couple?.groom?.nickname} & {couple?.bride?.nickname}
          </h2>

          <div className="w-12 h-px bg-primary-foreground/30 mb-6" />

          <Text size="sm" className="text-primary-foreground/60">
            © {new Date().getFullYear()} Darsana Premium. Built with Template Engine.
          </Text>
        </motion.div>
      </Container>
    </footer>
  );
}
