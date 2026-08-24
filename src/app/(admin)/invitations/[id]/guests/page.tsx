import { PageContainer } from "@/components/admin/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { GuestClientList } from "./client-list";
import { GuestService } from "@/features/guest/service";
import { GuestRepository } from "@/features/guest/repository";
import { InvitationService } from "@/features/invitation/service";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 0;

export default async function GuestsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const invitationService = new InvitationService(supabase);
  const guestService = new GuestService(new GuestRepository(supabase));

  const invitation = await invitationService.getById(resolvedParams.id);

  if (!invitation) {
    notFound();
  }

  // Parse search params for server-side pagination/filtering
  const page = parseInt((resolvedSearchParams.page as string) || "1", 10);
  const limit = 10;

  const query = resolvedSearchParams.query as string | undefined;
  const sortBy =
    (resolvedSearchParams.sortBy as "name" | "created_at" | "updated_at") || "created_at";

  const { data: guests, count } = await guestService.searchGuests({
    invitation_id: resolvedParams.id,
    query,
    page,
    limit,
    sortBy,
    sortOrder: sortBy === "name" ? "asc" : "desc",
  });

  return (
    <PageContainer>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PageHeader
          heading={`Guests - /${invitation.slug}`}
          text="Manage your guest list, RSVPs, and import/export data."
        >
          <Button variant="outline" render={<Link href={`/invitations/${invitation.id}`} />}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invitation
          </Button>
        </PageHeader>
        <GuestClientList
          invitationId={invitation.id}
          invitationSlug={invitation.slug}
          guests={guests}
          totalCount={count}
          currentPage={page}
          pageSize={limit}
        />
      </div>
    </PageContainer>
  );
}
