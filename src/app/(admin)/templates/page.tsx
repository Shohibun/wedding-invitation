"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageContainer } from "@/components/admin/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { SearchBar } from "@/components/dashboard/toolbar";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ExternalLink,
  Plus,
  Crown,
  Layers,
  Music,
  Gift,
  Heart,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface TemplateItem {
  id: string;
  name: string;
  category: string;
  description: string;
  version: string;
  isDefault?: boolean;
  isAvailable: boolean;
  image: string;
  features: string[];
  demoSlug?: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: "darsana",
    name: "Darsana Premium",
    category: "Royal Luxury",
    description:
      "Desain undangan pernikahan agung dengan tipografi emas, glassmorphism, dan aksen estetika kerajaan.",
    version: "v2.0 (Royal Redesign)",
    isDefault: true,
    isAvailable: true,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Amplop Digital & QR Code",
      "Background Music MP3",
      "Love Story Timeline",
      "RSVP Tamu & Doa",
      "Realtime Countdown",
      "Google Maps Direction",
      "Masonry Photo Gallery",
    ],
    demoSlug: "shohibun-and-jiwon",
  },
  {
    id: "aruna",
    name: "Aruna Javanese Classic",
    category: "Traditional",
    description:
      "Sentuhan nuansa adat Jawa klasik dengan ornamen batik kencana dan tipografi pewayangan modern.",
    version: "v1.0 (Upcoming)",
    isAvailable: false,
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Ornamen Batik Keraton",
      "Gamelan Audio Theme",
      "Aksara Jawa Typography",
      "Sungkeman Milestone",
    ],
  },
  {
    id: "sora",
    name: "Sora Editorial Modern",
    category: "Minimalist",
    description:
      "Estetika minimalis kontemporer ala majalah editorial dengan tata letak visual bersih dan monokrom.",
    version: "v1.0 (Upcoming)",
    isAvailable: false,
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Editorial Clean Layout",
      "Film Grain Overlay",
      "High-Fashion Typography",
      "Interactive Polaroid",
    ],
  },
];

const CATEGORIES = ["Semua", "Royal Luxury", "Traditional", "Minimalist"];

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    const matchesSearch =
      tpl.name.toLowerCase().includes(search.toLowerCase()) ||
      tpl.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || tpl.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageContainer>
      <PageHeader
        heading="Wedding Templates"
        text="Jelajahi dan kelola tema desain undangan pernikahan premium yang tersedia pada sistem CMS."
      >
        <Button nativeButton={false} render={<Link href="/invitations/create" />}>
          <Plus className="w-4 h-4 mr-1.5" /> Buat Undangan Baru
        </Button>
      </PageHeader>

      <div className="mt-6 space-y-6">
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-surface p-2.5 rounded-xl border">
          <div className="w-full sm:w-80">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari tema template..."
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                    : "text-textMuted hover:text-text hover:bg-surfaceMuted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => {
            const isAvailable = template.isAvailable;

            return (
              <div
                key={template.id}
                className={`group relative flex flex-col rounded-2xl border bg-surface overflow-hidden shadow-xs transition-all duration-300 ${
                  isAvailable
                    ? "hover:shadow-xl hover:border-primary/50 hover:-translate-y-1"
                    : "opacity-85"
                }`}
              >
                {/* Visual Image Banner */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-surfaceMuted">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`object-cover transition-transform duration-500 ${
                      isAvailable ? "group-hover:scale-105" : "grayscale"
                    }`}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Badges Top Left & Right */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {template.isDefault && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500 text-white shadow-md">
                        <Crown className="w-3 h-3" /> Default Active
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 text-white/90 backdrop-blur-md border border-white/20">
                      <Sparkles className="w-3 h-3 text-amber-300" /> {template.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/50 text-white/80 backdrop-blur-md border border-white/10">
                      {template.version}
                    </span>
                  </div>

                  {/* Title Preview on Banner Bottom */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-serif font-bold text-white tracking-wide drop-shadow-md">
                      {template.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-3">
                    <p className="text-xs text-textMuted leading-relaxed">{template.description}</p>

                    {/* Features List */}
                    <div className="space-y-1.5 pt-2 border-t border-border/60">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-textMuted flex items-center gap-1.5">
                        <Layers className="w-3 h-3 text-primary" /> Fitur & Modul Unggulan
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {template.features.map((feat, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] bg-surfaceMuted border text-text/80"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="pt-3 border-t flex items-center gap-2">
                    {isAvailable ? (
                      <>
                        <Button
                          nativeButton={false}
                          variant="default"
                          size="sm"
                          className="flex-1 cursor-pointer font-medium shadow-xs"
                          render={<Link href={`/invitations/create`} />}
                        >
                          <Plus className="w-3.5 h-3.5 mr-1" /> Gunakan Template
                        </Button>

                        {template.demoSlug && (
                          <Button
                            nativeButton={false}
                            variant="outline"
                            size="sm"
                            className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                            render={
                              <Link href={`/invitation/${template.demoSlug}`} target="_blank" />
                            }
                            title="Buka Demo Preview Publik"
                          >
                            <ExternalLink className="w-3.5 h-3.5 mr-1" /> Live Demo
                          </Button>
                        )}
                      </>
                    ) : (
                      <div className="w-full py-1.5 px-3 rounded-lg bg-muted/60 border text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 opacity-60" /> Sedang Dalam Pengembangan
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Template Engine Architecture Banner */}
        <div className="mt-8 rounded-2xl bg-linear-to-br from-primary/10 via-surface to-amber-500/5 border border-primary/20 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text">Darsana Modular Layout Engine 2.0</h4>
              <p className="text-xs text-textMuted mt-0.5 max-w-xl">
                Arsitektur template mendukung drag-and-drop live builder, preset resolver otomatis,
                multi-device glassmorphism, dan integrasi penuh Supabase.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs text-textMuted">
              <Music className="w-3.5 h-3.5 text-primary" /> Audio Engine
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-textMuted">
              <Gift className="w-3.5 h-3.5 text-primary" /> Bank & QR
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-textMuted">
              <Heart className="w-3.5 h-3.5 text-primary" /> Love Story
            </span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
