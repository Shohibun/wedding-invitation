"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RsvpSectionProps } from "./types";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/typography/section-title";
import { Button } from "@/components/ui/button";
import { rsvpVariants } from "./animations";
import { CheckCircle2, Send } from "lucide-react";

const rsvpSchema = z.object({
  name: z.string().min(2, "Nama terlalu pendek").max(100),
  attendance: z.enum(["yes", "no"], { message: "Silakan pilih kehadiran Anda" }),
  guests: z.string().min(1, "Pilih jumlah tamu"),
});

type RsvpFormValues = z.infer<typeof rsvpSchema>;

export function RsvpSection({ className }: RsvpSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
  });

  const onSubmit = (_data: RsvpFormValues) => {
    setIsSubmitted(true);
  };

  return (
    <section className={`w-full py-14 sm:py-20 md:py-24 bg-muted/20 ${className || ""}`}>
      <Container>
        <motion.div
          variants={rsvpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center w-full"
        >
          <SectionTitle title="RSVP" subtitle="Konfirmasi Kehadiran" />

          <div className="w-full max-w-lg mt-8 sm:mt-12 bg-card/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl shadow-black/5 border border-amber-500/20">
            {isSubmitted ? (
              <div className="text-center py-8 sm:py-10">
                <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
                  <CheckCircle2 className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium mb-1.5 text-foreground">
                  Terima Kasih!
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                  Konfirmasi kehadiran Anda telah berhasil kami catat.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-6 rounded-full text-xs border-amber-500/30 hover:bg-amber-500/10"
                  onClick={() => setIsSubmitted(false)}
                >
                  Kirim Konfirmasi Lain
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-foreground">
                    Nama Lengkap
                  </label>
                  <input
                    id="name"
                    suppressHydrationWarning
                    {...register("name")}
                    className="flex h-9 sm:h-10 w-full rounded-xl border border-input bg-background/80 px-3.5 py-1.5 text-xs sm:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                  {errors.name && (
                    <span className="text-destructive text-[11px] mt-0.5">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="attendance" className="text-xs font-semibold text-foreground">
                    Konfirmasi Kehadiran
                  </label>
                  <select
                    id="attendance"
                    suppressHydrationWarning
                    {...register("attendance")}
                    className="flex h-9 sm:h-10 w-full rounded-xl border border-input bg-background/80 px-3 py-1.5 text-xs sm:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                  >
                    <option value="">Pilih status kehadiran...</option>
                    <option value="yes">Hadir</option>
                    <option value="no">Maaf, Tidak Bisa Hadir</option>
                  </select>
                  {errors.attendance && (
                    <span className="text-destructive text-[11px] mt-0.5">
                      {errors.attendance.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="guests" className="text-xs font-semibold text-foreground">
                    Jumlah Tamu
                  </label>
                  <select
                    id="guests"
                    suppressHydrationWarning
                    {...register("guests")}
                    className="flex h-9 sm:h-10 w-full rounded-xl border border-input bg-background/80 px-3 py-1.5 text-xs sm:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                  >
                    <option value="">Pilih jumlah tamu...</option>
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                    <option value="3">3 Orang</option>
                    <option value="4">4 Orang</option>
                    <option value="5+">Lebih dari 4 Orang</option>
                  </select>
                  {errors.guests && (
                    <span className="text-destructive text-[11px] mt-0.5">
                      {errors.guests.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  size="default"
                  className="w-full mt-3 rounded-full text-xs font-medium gap-1.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md shadow-amber-500/20 h-9.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Konfirmasi Kehadiran</span>
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
