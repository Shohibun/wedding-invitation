import { PageContainer } from "@/components/admin/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { InvitationForm } from "../components/invitation-form";
import { InvitationService } from "@/features/invitation/service";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Users } from "lucide-react";

export const revalidate = 0;

export default async function EditInvitationPage({ params }: { params: { id: string } }) {
  if (!params?.id || params.id === "undefined") {
    notFound();
  }

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
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href={`/invitations/${params.id}/guests`} />}
          >
            <Users className="mr-2 h-4 w-4" />
            Manage Guests
          </Button>
          <Button
            nativeButton={false}
            variant="default"
            render={<Link href={`/invitation/${invitation.slug}`} target="_blank" />}
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
