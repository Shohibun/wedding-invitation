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
    <section className={`w-full py-24 bg-background ${className || ""}`}>
      <Container>
        <motion.div
          variants={wishVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <SectionTitle title="Wishes" subtitle="Kirimkan Doa dan Ucapan" />

          <div className="w-full max-w-2xl mt-12 grid grid-cols-1 gap-12">
            {/* Form */}
            <div className="bg-muted/10 p-6 rounded-2xl border border-border/50">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <textarea
                  value={newWish}
                  onChange={(e) => setNewWish(e.target.value)}
                  placeholder="Tuliskan doa dan ucapan Anda..."
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  required
                />
                <Button type="submit" className="self-end rounded-full px-8">
                  Kirim Ucapan
                </Button>
              </form>
            </div>

            {/* List */}
            <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {wishes.map((wish) => (
                <div
                  key={wish.id}
                  className="flex flex-col p-5 bg-background border border-border/40 rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                      {wish.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <Heading level={6} className="font-bold">
                        {wish.name}
                      </Heading>
                      <Text size="sm" className="text-xs text-muted-foreground">
                        {wish.time}
                      </Text>
                    </div>
                  </div>
                  <Text className="text-foreground/90 pl-13">{wish.text}</Text>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
