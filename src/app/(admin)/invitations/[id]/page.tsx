import { PageContainer } from "@/components/admin/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { InvitationForm } from "../components/invitation-form";
import { InvitationService } from "@/features/invitation/service";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Users, Sparkles, Paintbrush } from "lucide-react";

export const revalidate = 0;

export default async function EditInvitationPage({ params }: { params: Promise<{ id: string }> }) {
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

  return (
    <PageContainer>
      <PageHeader heading="Edit Invitation" text={`Editing invitation: /${invitation.slug}`}>
        <div className="flex items-center gap-2">
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href={`/invitations/${id}/guests`} />}
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

      {/* Live Builder Shortcut Banner */}
      <div className="mt-6 rounded-3xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Interactive Live Visual Builder
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">
              Kelola Konten & Tampilan Visual Undangan
            </h2>
            <p className="text-sm text-blue-100 max-w-xl leading-relaxed">
              Atur Foto Prewedding, Cover, Musik Latar, Detail Pasangan, Cerita Cinta, Lokasi Acara,
              dan Rekening Kado secara langsung dengan pratinjau live.
            </p>
          </div>
          <Button
            nativeButton={false}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold shadow-lg shrink-0 transition-transform active:scale-95"
            render={<Link href={`/invitations/${id}/builder`} />}
          >
            <Paintbrush className="mr-2 h-5 w-5 text-blue-600" />
            Buka Live Visual Builder
          </Button>
        </div>
      </div>

      <div className="mt-6 max-w-3xl">
        <InvitationForm initialData={invitation} />
      </div>
    </PageContainer>
  );
}
