import { PageContainer } from "@/components/admin/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { InvitationForm } from "../components/invitation-form";
import { InvitationService } from "@/features/invitation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, Users } from "lucide-react";

export const revalidate = 0;

export default async function EditInvitationPage({ params }: { params: { id: string } }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const invitationService = new InvitationService(supabase);
  const invitation = await invitationService.getById(params.id);

  if (!invitation) {
    notFound();
  }

  return (
    <PageContainer>
      <PageHeader heading="Edit Invitation" text={`Editing invitation: /${invitation.slug}`}>
        <div className="flex items-center gap-2">
          <Button render={<Link href={`/invitations/${invitation.id}/guests`} />} variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Manage Guests
          </Button>
          <Button
            render={<Link href={`/invitation/${invitation.slug}`} target="_blank" />}
            variant="default"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview Live
          </Button>
        </div>
      </PageHeader>

      <div className="mt-6 max-w-3xl">
        <InvitationForm initialData={invitation} />
      </div>
    </PageContainer>
  );
}
