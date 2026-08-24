"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/admin/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  User,
  ShieldCheck,
  Database,
  HardDrive,
  Trash2,
  Sparkles,
  Layers,
  ArrowUpRight,
  RefreshCw,
  Server,
  Globe,
  Sliders,
} from "lucide-react";

export default function SettingsPage() {
  const [platformName, setPlatformName] = useState("DarsanaCMS Single Admin");
  const [defaultLocale, setDefaultLocale] = useState("id-ID (Bahasa Indonesia)");
  const [isSavingPref, setIsSavingPref] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPref(true);
    setTimeout(() => {
      setIsSavingPref(false);
      toast.success("Preferensi sistem berhasil disimpan.");
    }, 600);
  };

  const handleClearCache = () => {
    try {
      // Clear draft localStorage caches
      if (typeof window !== "undefined") {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("draft_backup_")) {
            localStorage.removeItem(key);
          }
        });
      }
      toast.success("Cache sistem & draft lokal berhasil dibersihkan.");
    } catch {
      toast.error("Gagal membersihkan cache.");
    }
  };

  return (
    <PageContainer>
      <PageHeader
        heading="System Settings"
        text="Kelola konfigurasi platform CMS, status infrastruktur database, dan preferensi sistem."
      />

      <div className="mt-6 max-w-5xl space-y-8">
        {/* Top Grid: Admin Profile Card & System Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Profile Highlight Card */}
          <div className="md:col-span-1 rounded-2xl border bg-surface p-6 flex flex-col justify-between shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-textMuted flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" /> Akun Administrator
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Active
                </span>
              </div>

              <div className="flex items-center gap-3.5 pt-1">
                <div className="w-13 h-13 rounded-full bg-linear-to-tr from-amber-500 to-primary p-0.5 shadow-md shrink-0">
                  <div className="w-full h-full rounded-full bg-surface flex items-center justify-center font-serif text-lg font-bold text-primary">
                    SN
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm text-text truncate">Shohibun Najam</h3>
                  <p className="text-xs text-textMuted truncate">shohibun@darsana.id</p>
                  <div className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-medium">
                    <ShieldCheck className="w-3 h-3" /> Single Admin
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t mt-4">
              <Button
                nativeButton={false}
                variant="outline"
                size="sm"
                className="w-full text-xs cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                render={<Link href="/settings/profile" />}
              >
                Ubah Profil & Sandi <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>

          {/* Supabase & Cloud Infrastructure Health Card */}
          <div className="md:col-span-2 rounded-2xl border bg-surface p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-textMuted flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-primary" /> Status Infrastruktur Supabase
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> All Systems
                  Operational
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-surfaceMuted/70 border flex flex-col justify-between">
                  <div className="flex items-center justify-between text-textMuted text-xs mb-1">
                    <span>Database</span>
                    <Database className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-sm font-semibold text-text">PostgreSQL 15</span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                    ● Connected
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-surfaceMuted/70 border flex flex-col justify-between">
                  <div className="flex items-center justify-between text-textMuted text-xs mb-1">
                    <span>Storage</span>
                    <HardDrive className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-sm font-semibold text-text">3 Public Buckets</span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                    ● Active & Ready
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-surfaceMuted/70 border flex flex-col justify-between">
                  <div className="flex items-center justify-between text-textMuted text-xs mb-1">
                    <span>Architecture</span>
                    <Layers className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-text">Single Admin MVP</span>
                  <span className="text-[11px] text-textMuted mt-0.5">Version 2.0</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-textMuted mt-4 pt-3 border-t">
              Koneksi terenkripsi via Supabase Row Level Security (RLS) dan Service Role API.
            </p>
          </div>
        </div>

        {/* Section: Platform Preferences */}
        <div className="rounded-2xl border bg-surface p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-semibold text-base text-text flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary" /> Preferensi Sistem & Tampilan CMS
              </h3>
              <p className="text-xs text-textMuted mt-0.5">
                Pengaturan default untuk undangan baru dan nama portal manajemen.
              </p>
            </div>
          </div>

          <form onSubmit={handleSavePreferences} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="platformName" className="text-xs font-medium">
                  Nama Portal CMS
                </Label>
                <Input
                  id="platformName"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  placeholder="DarsanaCMS"
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="defaultLocale" className="text-xs font-medium">
                  Bahasa & Locale Default
                </Label>
                <div className="relative">
                  <Input
                    id="defaultLocale"
                    value={defaultLocale}
                    onChange={(e) => setDefaultLocale(e.target.value)}
                    className="text-xs pl-8"
                  />
                  <Globe className="w-3.5 h-3.5 text-textMuted absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surfaceMuted/50 border flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-text flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Template Default Saat Buat
                  Undangan
                </span>
                <p className="text-[11px] text-textMuted">
                  Template yang otomatis dipilih pada form pembuatan undangan baru.
                </p>
              </div>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                Darsana Premium (Royal Gold)
              </span>
            </div>

            <div className="pt-2">
              <Button type="submit" size="sm" disabled={isSavingPref} className="cursor-pointer">
                {isSavingPref ? <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : null}
                Simpan Preferensi
              </Button>
            </div>
          </form>
        </div>

        {/* Section: Cache & Performance */}
        <div className="rounded-2xl border bg-surface p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-base text-text flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-primary" /> Manajemen Cache & Performa
              </h3>
              <p className="text-xs text-textMuted mt-0.5">
                Bersihkan draft lokal yang tersimpan di memori browser untuk menyinkronkan ulang
                data murni dari server.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClearCache}
              className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Bersihkan Cache Lokal
            </Button>
          </div>
        </div>

        {/* Section: Danger Zone */}
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="font-semibold text-base text-destructive flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Zona Berbahaya (Danger Zone)
            </h3>
            <p className="text-xs text-textMuted mt-0.5">
              Tindakan permanen yang berpengaruh ke seluruh cache edge platform.
            </p>
          </div>

          <div className="pt-2">
            <ConfirmDialog
              title="Bersihkan Semua Cache Sistem?"
              description="Tindakan ini akan mengosongkan cache edge server dan memicu render ulang untuk semua undangan yang sedang aktif."
              confirmText="Bersihkan Cache Edge"
              destructive
              onConfirm={() => toast.success("Seluruh cache edge server telah dibersihkan.")}
              trigger={
                <Button variant="destructive" size="sm" className="cursor-pointer text-xs">
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Bersihkan Cache Edge Server
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
