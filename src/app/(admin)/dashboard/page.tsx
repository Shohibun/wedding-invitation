import { PageContainer } from "@/components/admin/page-container";
import { StatCard } from "@/components/dashboard/cards";
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
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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
  }

  const totalInvitations = invitations.length;
  const publishedInvitations = invitations.filter((inv) => inv.status === "published").length;
  const draftInvitations = invitations.filter((inv) => inv.status === "draft").length;

  return (
    <PageContainer>
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 p-8 text-white shadow-xl mb-8">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-medium text-blue-100 backdrop-blur-sm mb-3">
              <span>Single Admin Management</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Selamat Datang di Portal Admin
            </h1>
            <p className="text-blue-100 text-sm mt-1 max-w-xl font-light">
              Kelola undangan pernikahan digital, pantau daftar tamu, dan pantau ucapan masuk dalam
              satu portal terintegrasi.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/invitations/create">
              <Button size="lg" variant="secondary" className="gap-2 font-semibold shadow-md">
                <Plus className="w-5 h-5" /> Buat Undangan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Undangan"
          value={totalInvitations.toString()}
          icon={MailsIcon}
          description="Semua undangan di dalam sistem"
          iconClassName="bg-blue-500/15 text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Undangan Dipublikasikan"
          value={publishedInvitations.toString()}
          icon={CheckCircle2}
          description="Undangan aktif terbit ke publik"
          iconClassName="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          title="Undangan Draft"
          value={draftInvitations.toString()}
          icon={FileEdit}
          description="Undangan dalam tahap pengeditan"
          iconClassName="bg-amber-500/15 text-amber-600 dark:text-amber-400"
        />
      </div>

      {/* Engagement Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        <StatCard
          title="Total Tamu Undangan"
          value={totalGuests.toString()}
          icon={UsersIcon}
          description="Total tamu terdaftar (Undangan Utama)"
          iconClassName="bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
        />
        <StatCard
          title="Konfirmasi RSVP"
          value={totalRsvps.toString()}
          icon={HeartHandshake}
          description="Tamu yang telah merespon RSVP"
          iconClassName="bg-purple-500/15 text-purple-600 dark:text-purple-400"
        />
        <StatCard
          title="Ucapan & Doa Masuk"
          value={totalWishes.toString()}
          icon={MessageSquare}
          description="Total ucapan tersimpan"
          iconClassName="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
        />
      </div>

      {/* Recent Invitations List */}
      <div className="mt-8 bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Daftar Undangan Terbaru</h2>
            <p className="text-xs text-muted-foreground font-light">
              Ringkasan undangan yang ada di sistem
            </p>
          </div>
          <Link href="/invitations">
            <Button variant="outline" size="sm">
              Lihat Semua
            </Button>
          </Link>
        </div>

        {invitations.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-xl">
            <MailsIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm font-medium text-foreground">Belum Ada Undangan</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              Buat undangan pertama Anda sekarang.
            </p>
            <Link href="/invitations/create">
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> Buat Undangan Pertama
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {invitations.slice(0, 5).map((inv) => (
              <div
                key={inv.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/50 transition-colors gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-foreground">
                        {inv.title || "Undangan Tanpa Judul"}
                      </h3>
                      <Badge
                        variant={inv.status === "published" ? "default" : "secondary"}
                        className="text-[10px] uppercase font-bold"
                      >
                        {inv.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">/{inv.slug}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/invitations/${inv.id}/builder`}>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                      <Edit3 className="w-3.5 h-3.5" /> Edit Builder
                    </Button>
                  </Link>
                  {inv.status === "published" && (
                    <Link href={`/invitation/${inv.slug}`} target="_blank">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-xs text-blue-600 dark:text-blue-400"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Lihat Publik
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
