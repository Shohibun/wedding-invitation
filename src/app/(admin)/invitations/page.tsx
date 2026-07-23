import { PageContainer } from "@/components/admin/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { InvitationService } from "@/features/invitation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import Link from "next/link";
import { InvitationClientList } from "./client-list";

export const revalidate = 0; // Ensure data is fresh in admin

export default async function InvitationsPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const invitationService = new InvitationService(supabase);
  const invitations = await invitationService.getAll();

  return (
    <PageContainer>
      <PageHeader heading="Invitations" text="Manage all wedding invitations in the system.">
        <Button render={<Link href="/invitations/create" />}>Create New</Button>
      </PageHeader>

      <div className="mt-6">
        <InvitationClientList initialData={invitations} />
      </div>
    </PageContainer>
  );
}
