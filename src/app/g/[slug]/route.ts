import { NextRequest, NextResponse } from "next/server";
import { InvitationService } from "@/features/invitation/service";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const token = request.nextUrl.searchParams.get("t");
  if (!token) {
    return new NextResponse("Invalid invitation link: Missing token", { status: 400 });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    // In a real app we might inject services, but here we instantiate directly for the Route Handler
    const { GuestService } = await import("@/features/guest/service");
    const { GuestRepository } = await import("@/features/guest/repository");
    const guestService = new GuestService(new GuestRepository(supabase));
    const invitationService = new InvitationService(supabase);

    const guest = await guestService.getGuestBySlugAndToken(slug, token);
    if (!guest) {
      return new NextResponse("Invalid or expired invitation link", { status: 404 });
    }

    // Track the visit
    await guestService.trackGuestVisit(guest.id);

    // Resolve invitation slug
    const invitation = await invitationService.getById(guest.invitation_id);
    if (!invitation) {
      return new NextResponse("Invitation not found", { status: 404 });
    }

    // Redirect to the actual invitation with guest ID and token in URL (if client needs it for Auth)
    // Or just guest ID if the template engine handles it
    const redirectUrl = new URL(`/invitation/${invitation.slug}`, request.url);
    redirectUrl.searchParams.set("guest", guest.id);
    // Optionally pass token if needed by the client, but usually the UUID is enough for public template view,
    // or we can pass it so the client can verify.
    redirectUrl.searchParams.set("token", token);

    return NextResponse.redirect(redirectUrl.toString(), 307);
  } catch (error) {
    console.error("Error in short link resolution:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
