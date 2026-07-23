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
    // We intentionally removed console.log for production readiness
    setIsSubmitted(true);
  };

  return (
    <section className={`w-full py-24 bg-muted/30 ${className || ""}`}>
      <Container>
        <motion.div
          variants={rsvpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <SectionTitle title="RSVP" subtitle="Konfirmasi Kehadiran" />

          <div className="w-full max-w-xl mt-12 bg-background p-8 rounded-2xl shadow-sm border border-border/50">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Terima Kasih!</h3>
                <p className="text-muted-foreground">
                  Konfirmasi kehadiran Anda telah kami terima.
                </p>
                <Button
                  variant="outline"
                  className="mt-8 rounded-full"
                  onClick={() => setIsSubmitted(false)}
                >
                  Kirim Ulang
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nama Lengkap
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Masukkan nama Anda"
                  />
                  {errors.name && (
                    <span className="text-destructive text-xs">{errors.name.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="attendance" className="text-sm font-medium">
                    Kehadiran
                  </label>
                  <select
                    id="attendance"
                    {...register("attendance")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Pilih kehadiran...</option>
                    <option value="yes">Ya, saya akan hadir</option>
                    <option value="no">Maaf, saya tidak bisa hadir</option>
                  </select>
                  {errors.attendance && (
                    <span className="text-destructive text-xs">{errors.attendance.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="guests" className="text-sm font-medium">
                    Jumlah Tamu
                  </label>
                  <select
                    id="guests"
                    {...register("guests")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Pilih jumlah tamu...</option>
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                  </select>
                  {errors.guests && (
                    <span className="text-destructive text-xs">{errors.guests.message}</span>
                  )}
                </div>

                <Button type="submit" className="w-full mt-4 rounded-full">
                  Konfirmasi Kehadiran
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
