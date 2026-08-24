import { notFound } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { InvitationService } from "@/features/invitation/service";
import { DraftService } from "@/features/drafts/service";
import { PublicInvitationView } from "@/features/public/invitation/PublicInvitationView";
import { Metadata, ResolvingMetadata } from "next";

export const revalidate = 0;

interface InvitationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: InvitationPageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const invitationService = new InvitationService(supabase);
  const invitation = await invitationService.getBySlug(slug);

  if (!invitation) {
    return {
      title: "Invitation Not Found",
    };
  }

  const title = invitation.title || "Wedding Invitation";

  return {
    title: title,
    description: `You are invited to ${title}`,
    openGraph: {
      title: title,
      description: `You are invited to ${title}`,
      type: "website",
    },
  };
}

export default async function InvitationPage(props: InvitationPageProps) {
  const params = await props.params;
  const { slug } = params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const invitationService = new InvitationService(supabase);
  const invitation = await invitationService.getBySlug(slug);

  if (!invitation) {
    notFound();
  }

  // Attempt to load the draft configuration
  let draftPayload: Record<string, unknown> | null = null;
  try {
    const draft = await DraftService.getDraft(invitation.id);
    if (draft) {
      draftPayload = DraftService.prepareBuilderData(draft) as Record<string, unknown>;
    }
  } catch {
    // ignore
  }

  return (
    <PublicInvitationView initialData={draftPayload} invitationId={invitation.id} slug={slug} />
  );
}
