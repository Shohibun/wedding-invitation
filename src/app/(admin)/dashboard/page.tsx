import { PageContainer } from "@/components/admin/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/cards";
import { UsersIcon, MailsIcon, CheckCircleIcon } from "lucide-react";

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
      guestService.searchGuests({ invitation_id: invitationIds[0], limit: 1 }),
      rsvpService.getByInvitationId(invitationIds[0]),
      wishService.getByInvitationId(invitationIds[0]),
    ]);
    // MVP limitation: dashboard only aggregates first invitation's stats for Guests/RSVPs/Wishes
    // because the backend services scope them heavily by invitationId
    totalGuests = guestsData.count || 0;
    totalRsvps = rsvpsData.length || 0;
    totalWishes = wishesData.length || 0;
  }

  const totalInvitations = invitations.length;
  const publishedInvitations = invitations.filter((inv) => inv.status === "published").length;
  const draftInvitations = invitations.filter((inv) => inv.status === "draft").length;
  return (
    <PageContainer>
      <PageHeader heading="Dashboard" text="Welcome to the Wedding Admin CMS." />

      <div className="grid gap-4 md:grid-cols-3 mt-6">
        <StatCard
          title="Total Invitations"
          value={totalInvitations.toString()}
          icon={MailsIcon}
          description="All invitations in the system"
        />
        <StatCard
          title="Published"
          value={publishedInvitations.toString()}
          icon={CheckCircleIcon}
          description="Live invitations"
        />
        <StatCard
          title="Drafts"
          value={draftInvitations.toString()}
          icon={UsersIcon}
          description="Work in progress"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3 mt-6">
        <StatCard
          title="Total Guests"
          value={totalGuests.toString()}
          icon={UsersIcon}
          description="Total invited guests (Primary Inv)"
        />
        <StatCard
          title="Total RSVPs"
          value={totalRsvps.toString()}
          icon={CheckCircleIcon}
          description="Total RSVPs (Primary Inv)"
        />
        <StatCard
          title="Total Wishes"
          value={totalWishes.toString()}
          icon={MailsIcon}
          description="Total Wishes (Primary Inv)"
        />
      </div>
    </PageContainer>
  );
}
