import { NextRequest, NextResponse } from "next/server";
import { InvitationService } from "@/features/invitation/service";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    const { GuestService } = await import("@/features/guest/service");
    const { GuestRepository } = await import("@/features/guest/repository");
    const guestService = new GuestService(new GuestRepository(supabase));
    const invitationService = new InvitationService(supabase);

    const guest = await guestService.getGuestByGlobalSlug(slug);
    if (!guest) {
      return new NextResponse("Invalid invitation link", { status: 404 });
    }

    const invitation = await invitationService.getById(guest.invitation_id);
    if (!invitation) {
      return new NextResponse("Invitation not found", { status: 404 });
    }

    const redirectUrl = new URL(`/invitation/${invitation.slug}`, request.url);
    redirectUrl.searchParams.set("guest", guest.id);

    return NextResponse.redirect(redirectUrl.toString(), 307);
  } catch (error) {
    console.error("Error in short link resolution:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
