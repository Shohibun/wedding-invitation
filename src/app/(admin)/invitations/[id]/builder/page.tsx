import { notFound } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { DraftService } from "@/features/drafts/service";
import { InvitationService } from "@/features/invitation/service";
import { BuilderShell } from "@/features/builder/components/BuilderShell";
import { darsanaConfig } from "@/templates/darsana/config";
import { BuilderProvider } from "@/features/builder/context/BuilderProvider";

export const revalidate = 0;

export default async function BuilderPage({ params }: { params: { id: string } }) {
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

  // Load the draft. If it doesn't exist, we will use the default template config.
  const draft = await DraftService.getDraft(params.id);
  let payload = draft ? DraftService.prepareBuilderData(draft) : null;

  if (!payload) {
    payload = JSON.parse(JSON.stringify(darsanaConfig)); // Base template config
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <BuilderProvider initialData={payload as Record<string, any>} invitationId={params.id}>
      <BuilderShell invitation={invitation} />
    </BuilderProvider>
  );
}
