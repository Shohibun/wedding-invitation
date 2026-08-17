"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { WishSectionProps } from "./types";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/typography/section-title";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/typography/text";
import { Heading } from "@/components/typography/heading";
import { wishVariants } from "./animations";
import { useTemplateData } from "@/templates/core/hooks";
import { Send, MessageSquareHeart } from "lucide-react";

export function WishSection({ className }: WishSectionProps) {
  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();
  const initialWishes = data?.wishes || [];

  const [wishes, setWishes] =
    useState<{ id: number; name: string; time: string; text: string }[]>(initialWishes);
  const [newWish, setNewWish] = useState("");
  const [newName, setNewName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.trim() || !newName.trim()) return;

    setWishes([
      {
        id: Date.now(),
        name: newName,
        time: "Baru saja",
        text: newWish,
      },
      ...wishes,
    ]);
    setNewWish("");
    setNewName("");
  };

  return (
    <section className={`w-full py-14 sm:py-20 md:py-24 bg-background ${className || ""}`}>
      <Container>
        <motion.div
          variants={wishVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center w-full"
        >
          <SectionTitle title="Wedding Wishes" subtitle="Kirimkan Doa & Ucapan Hangat" />

          <div className="w-full max-w-xl mt-8 sm:mt-12 flex flex-col gap-6">
            {/* Form */}
            <div className="bg-card/90 backdrop-blur-md p-5 sm:p-7 rounded-3xl border border-amber-500/20 shadow-xl shadow-black/5">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <input
                  type="text"
                  suppressHydrationWarning
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nama Lengkap Anda"
                  className="w-full bg-background/80 border border-input rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  required
                />
                <textarea
                  suppressHydrationWarning
                  value={newWish}
                  onChange={(e) => setNewWish(e.target.value)}
                  placeholder="Tuliskan ucapan dan doa restu terbaik untuk kedua mempelai..."
                  className="w-full bg-background/80 border border-input rounded-xl px-3.5 py-2.5 text-xs sm:text-sm min-h-24 focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none leading-relaxed"
                  required
                />
                <Button
                  type="submit"
                  size="default"
                  className="self-end rounded-full px-6 text-xs h-9 gap-1.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md shadow-amber-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Ucapan</span>
                </Button>
              </form>
            </div>

            {/* List */}
            <div className="flex flex-col gap-3 max-h-96 sm:max-h-120 overflow-y-auto pr-1 custom-scrollbar">
              {wishes.map((wish) => (
                <div
                  key={wish.id}
                  className="flex flex-col p-4 bg-card/70 border border-amber-500/15 rounded-2xl shadow-xs"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center font-serif font-bold text-xs">
                      {wish.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <Heading level={6} className="font-semibold text-xs text-foreground">
                        {wish.name}
                      </Heading>
                      <Text size="sm" className="text-[10px] text-muted-foreground">
                        {wish.time}
                      </Text>
                    </div>
                    <MessageSquareHeart className="w-3.5 h-3.5 text-amber-500/50 ml-auto" />
                  </div>
                  <Text className="text-foreground/90 text-xs leading-relaxed pl-10.5">
                    {wish.text}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
