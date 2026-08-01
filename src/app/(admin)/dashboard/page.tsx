import { PageContainer } from "@/components/admin/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/cards";
import { UsersIcon, MailsIcon, CheckCircleIcon } from "lucide-react";

import { InvitationService } from "@/features/invitation";
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
  const invitations = await invitationService.getAll();

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
    </PageContainer>
  );
}
