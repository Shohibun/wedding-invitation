import { notFound } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { DraftService } from "@/features/drafts/service";
import { InvitationService } from "@/features/invitation/service";
import { BuilderShell } from "@/features/builder/components/BuilderShell";
import { darsanaConfig } from "@/templates/darsana/config";
import { BuilderProvider } from "@/features/builder/context/BuilderProvider";

export const revalidate = 0;

export default async function BuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id || id === "undefined") {
    notFound();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const invitationService = new InvitationService(supabase);
  const invitation = await invitationService.getById(id);

  if (!invitation) {
    notFound();
  }

  const draft = await DraftService.getDraft(id, supabase);
  let payload = draft ? DraftService.prepareBuilderData(draft) : null;

  if (!payload) {
    payload = JSON.parse(JSON.stringify(darsanaConfig));
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <BuilderProvider initialData={payload as Record<string, any>} invitationId={id}>
      <BuilderShell invitation={invitation} />
    </BuilderProvider>
  );
}
