import { PageContainer } from "@/components/admin/page-container";
import {
  UsersIcon,
  MailsIcon,
  CheckCircle2,
  FileEdit,
  HeartHandshake,
  MessageSquare,
  Plus,
  ExternalLink,
  Edit3,
  Layers,
  Heart,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

import { InvitationService } from "@/features/invitation/service";
import { GuestService } from "@/features/guest/service";
import { RsvpService } from "@/features/rsvp/service";
import { WishService } from "@/features/wish/service";
import { GuestRepository } from "@/features/guest/repository";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export const revalidate = 0;

export default async function DashboardPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const invitationService = new InvitationService(supabase);
  const guestService = new GuestService(new GuestRepository(supabase));
  const rsvpService = new RsvpService(supabase);
  const wishService = new WishService(supabase);

  const invitations = await invitationService.getAll();
  const invitationIds = invitations.map((i) => i.id);

  let totalGuests = 0;
  let totalRsvps = 0;
  let totalWishes = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentWishes: any[] = [];

  if (invitationIds.length > 0) {
    const [guestsData, rsvpsData, wishesData] = await Promise.all([
      guestService
        .searchGuests({ invitation_id: invitationIds[0], limit: 1 })
        .catch(() => ({ count: 0, items: [] })),
      rsvpService.getByInvitationId(invitationIds[0]).catch(() => []),
      wishService.getByInvitationId(invitationIds[0]).catch(() => []),
    ]);
    totalGuests = guestsData?.count || 0;
    totalRsvps = rsvpsData?.length || 0;
    totalWishes = wishesData?.length || 0;
    recentWishes = (wishesData || []).slice(0, 4);
  }

  const totalInvitations = invitations.length;
  const publishedInvitations = invitations.filter((inv) => inv.status === "published").length;
  const draftInvitations = invitations.filter((inv) => inv.status === "draft").length;

  return (
    <PageContainer>
      {/* 👑 Royal Luxury Executive Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-950 via-slate-900 to-indigo-950 border border-primary/25 p-7 sm:p-8 text-white shadow-xl mb-8">
        {/* Glow ambient background rings */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/35 text-xs font-semibold text-amber-300 backdrop-blur-md">
                <Crown className="w-3.5 h-3.5" /> Darsana Single Admin CMS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-white/80 backdrop-blur-md border border-white/10">
                <Calendar className="w-3 h-3 text-amber-400" />
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-white drop-shadow-sm">
              Selamat Datang,{" "}
              <span className="bg-linear-to-r from-amber-200 via-amber-400 to-primary bg-clip-text text-transparent">
                Shohibun Najam
              </span>
            </h1>

            <p className="text-white/70 text-xs sm:text-sm max-w-2xl font-light leading-relaxed">
              Pusat kendali undangan pernikahan digital eksklusif. Pantau status publikasi, kelola
              data tamu, konfirmasi kehadiran RSVP, dan ucapan doa dalam satu platform terpadu.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              nativeButton={false}
              size="lg"
              className="gap-2 font-semibold bg-linear-to-r from-amber-500 to-primary text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 cursor-pointer border-none"
              render={<Link href="/invitations/create" />}
            >
              <Plus className="w-4 h-4" /> Buat Undangan Baru
            </Button>

            <Button
              nativeButton={false}
              variant="outline"
              size="lg"
              className="gap-2 font-medium bg-white/5 hover:bg-white/10 text-white border-white/20 backdrop-blur-md cursor-pointer"
              render={<Link href="/templates" />}
            >
              <Layers className="w-4 h-4 text-amber-300" /> Tema Desain
            </Button>
          </div>
        </div>
      </div>

      {/* 📊 High-End Metrics Grid (6 Interactive Cards) */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Total Undangan */}
        <div className="group relative rounded-2xl border bg-surface p-5 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-blue-500/40 hover:-translate-y-0.5 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-wider">
              Total Undangan
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center transition-transform group-hover:scale-110">
              <MailsIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-text tracking-tight">
              {totalInvitations}
            </span>
            <span className="text-xs text-textMuted">Project Aktif</span>
          </div>
          <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-textMuted">
            <span>Semua undangan dalam sistem</span>
            <span className="text-blue-500 font-medium">100% Ready</span>
          </div>
        </div>

        {/* Card 2: Undangan Dipublikasikan */}
        <div className="group relative rounded-2xl border bg-surface p-5 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-emerald-500/40 hover:-translate-y-0.5 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-wider">
              Dipublikasikan
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center transition-transform group-hover:scale-110">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-emerald-500 tracking-tight">
              {publishedInvitations}
            </span>
            <span className="text-xs text-emerald-600/80 dark:text-emerald-400/80 font-medium">
              Live Publik
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-textMuted">
            <span>Undangan aktif dapat diakses</span>
            <span className="inline-flex items-center gap-1 text-emerald-500 text-[11px] font-medium">
              <Globe className="w-3 h-3" /> Online
            </span>
          </div>
        </div>

        {/* Card 3: Undangan Draft */}
        <div className="group relative rounded-2xl border bg-surface p-5 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-amber-500/40 hover:-translate-y-0.5 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-wider">
              Tahap Draft
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center transition-transform group-hover:scale-110">
              <FileEdit className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-amber-500 tracking-tight">
              {draftInvitations}
            </span>
            <span className="text-xs text-amber-600/80 dark:text-amber-400/80 font-medium">
              Dalam Desain
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-textMuted">
            <span>Disimpan di Supabase Cloud</span>
            <span className="text-amber-500 font-medium">Drafting</span>
          </div>
        </div>

        {/* Card 4: Total Tamu Undangan */}
        <div className="group relative rounded-2xl border bg-surface p-5 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-indigo-500/40 hover:-translate-y-0.5 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-wider">
              Total Tamu
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center transition-transform group-hover:scale-110">
              <UsersIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-text tracking-tight">
              {totalGuests}
            </span>
            <span className="text-xs text-textMuted">Tamu Terdaftar</span>
          </div>
          <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-textMuted">
            <span>Daftar tamu terintegrasi</span>
            <span className="text-indigo-500 font-medium">Manifest</span>
          </div>
        </div>

        {/* Card 5: Konfirmasi RSVP */}
        <div className="group relative rounded-2xl border bg-surface p-5 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-pink-500/40 hover:-translate-y-0.5 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-wider">
              Konfirmasi RSVP
            </span>
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-500 flex items-center justify-center transition-transform group-hover:scale-110">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-pink-500 tracking-tight">
              {totalRsvps}
            </span>
            <span className="text-xs text-pink-600/80 dark:text-pink-400/80 font-medium">
              Respon Tamu
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-textMuted">
            <span>Kehadiran terkonfirmasi</span>
            <span className="text-pink-500 font-medium">Realtime</span>
          </div>
        </div>

        {/* Card 6: Ucapan & Doa Masuk */}
        <div className="group relative rounded-2xl border bg-surface p-5 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-cyan-500/40 hover:-translate-y-0.5 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-wider">
              Doa & Ucapan Masuk
            </span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 flex items-center justify-center transition-transform group-hover:scale-110">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-cyan-500 tracking-tight">
              {totalWishes}
            </span>
            <span className="text-xs text-cyan-600/80 dark:text-cyan-400/80 font-medium">
              Pesan Hangat
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-textMuted">
            <span>Buku tamu digital aktif</span>
            <span className="text-cyan-500 font-medium">Guestbook</span>
          </div>
        </div>
      </div>

      {/* 🚀 Dual-Column Activity & Invitation Hub */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Recent Invitations */}
        <div className="lg:col-span-2 rounded-2xl border bg-surface p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base sm:text-lg font-serif font-bold text-text flex items-center gap-2">
                  <MailsIcon className="w-4 h-4 text-primary" /> Daftar Undangan Aktif
                </h2>
                <p className="text-xs text-textMuted mt-0.5">
                  Kelola dan sunting konten undangan pernikahan yang tersimpan.
                </p>
              </div>
              <Button
                nativeButton={false}
                variant="outline"
                size="sm"
                className="text-xs cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                render={<Link href="/invitations" />}
              >
                Lihat Semua <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            {invitations.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border rounded-xl bg-surfaceMuted/40">
                <MailsIcon className="w-10 h-10 text-textMuted mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold text-text">Belum Ada Undangan</p>
                <p className="text-xs text-textMuted mt-0.5 mb-4">
                  Mulai buat undangan pernikahan pertama Anda.
                </p>
                <Button nativeButton={false} size="sm" render={<Link href="/invitations/create" />}>
                  <Plus className="w-4 h-4 mr-1" /> Buat Undangan
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {invitations.slice(0, 4).map((inv) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const invAny = inv as any;
                  const coverUrl =
                    invAny.draft_payload?.cover?.image ||
                    invAny.drafts?.[0]?.payload?.cover?.image ||
                    invAny.gallery?.[0]?.url;

                  const groom =
                    invAny.draft_payload?.couple?.groom?.nickname ||
                    invAny.couples?.[0]?.groom?.nickname ||
                    "Groom";
                  const bride =
                    invAny.draft_payload?.couple?.bride?.nickname ||
                    invAny.couples?.[0]?.bride?.nickname ||
                    "Bride";

                  return (
                    <div
                      key={inv.id}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border/70 bg-surfaceMuted/40 hover:bg-surfaceMuted hover:border-primary/40 transition-all gap-4 shadow-xs"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Cover Image Thumbnail */}
                        <div className="relative w-12 h-16 rounded-lg overflow-hidden border border-border/80 bg-muted shrink-0 shadow-xs">
                          {coverUrl ? (
                            <Image
                              src={coverUrl}
                              alt="Cover"
                              fill
                              unoptimized={coverUrl.startsWith("data:")}
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-textMuted">
                              N/A
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif font-bold text-sm text-text truncate">
                              {`${groom} & ${bride}`}
                            </h3>
                            <Badge
                              variant={inv.status === "published" ? "default" : "secondary"}
                              className={`text-[9px] uppercase font-semibold px-2 py-0.5 rounded-md ${
                                inv.status === "published"
                                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                  : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                              }`}
                            >
                              {inv.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-primary font-mono mt-0.5 truncate">
                            /{inv.slug}
                          </p>
                          <span className="text-[11px] text-textMuted mt-0.5 block">
                            Tema: <span className="capitalize text-text/80">{inv.theme}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          nativeButton={false}
                          variant="default"
                          size="sm"
                          className="gap-1.5 text-xs cursor-pointer font-medium"
                          render={<Link href={`/invitations/${inv.id}/builder`} />}
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit Builder
                        </Button>

                        <Button
                          nativeButton={false}
                          variant="outline"
                          size="sm"
                          className="gap-1.5 text-xs cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                          render={<Link href={`/invitation/${inv.slug}`} target="_blank" />}
                          title="Lihat Pratinjau Publik"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Preview
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1/3): Live Wishes Feed & System Status */}
        <div className="space-y-6">
          {/* Recent Wishes Card */}
          <div className="rounded-2xl border bg-surface p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif font-bold text-sm text-text flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-500" /> Doa Tamu Terbaru
              </h3>
              <span className="text-[11px] text-textMuted font-medium">{totalWishes} Pesan</span>
            </div>

            {recentWishes.length === 0 ? (
              <div className="text-center py-6 text-xs text-textMuted">
                Belum ada ucapan doa yang masuk.
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentWishes.map((w, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-surfaceMuted/50 border text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-semibold text-text">
                      <span className="truncate">{w.guest_name || "Tamu Undangan"}</span>
                      <span className="text-[10px] text-textMuted font-normal">
                        {w.created_at
                          ? new Date(w.created_at).toLocaleDateString("id-ID")
                          : "Baru saja"}
                      </span>
                    </div>
                    <p className="text-textMuted line-clamp-2 italic">
                      &ldquo;{w.message || "Selamat berbahagia!"}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Platform Performance Card */}
          <div className="rounded-2xl border bg-linear-to-br from-surface to-primary/5 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Status Sistem CMS
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Terhubung
              </span>
            </div>

            <p className="text-[11px] text-textMuted leading-relaxed">
              Platform beroperasi dalam mode <strong>Single Admin CMS</strong> dengan rendering
              otomatis Supabase Cloud dan Darsana Layout Engine 2.0.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function Crown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 14.168A2 2 0 0 1 17.186 22H6.814a2 2 0 0 1-1.961-1.813L2.019 6.02a.5.5 0 0 1 .798-.52l4.277 3.665a1 1 0 0 0 1.516-.294z" />
    </svg>
  );
}
