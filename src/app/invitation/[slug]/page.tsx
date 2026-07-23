import { notFound } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { TemplateRenderer } from "@/components/template-renderer";
import { InvitationService } from "@/features/invitation";
import { PersonService } from "@/features/couple";
import { WeddingEventService } from "@/features/event";
import { GalleryImageService } from "@/features/gallery";
import { LoveStoryService } from "@/features/story";
import { GiftAccountService } from "@/features/gift";
import { WishService } from "@/features/wish";

import { personSchema } from "@/features/couple/schema";
import { weddingeventSchema } from "@/features/event/schema";
import { galleryimageSchema } from "@/features/gallery/schema";
import { lovestorySchema } from "@/features/story/schema";
import { giftaccountSchema } from "@/features/gift/schema";
import { wishSchema } from "@/features/wish/schema";

interface InvitationPageProps {
  params: Promise<{
    slug: string;
  }>;
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

  const personService = new PersonService(supabase);
  const eventService = new WeddingEventService(supabase);
  const galleryService = new GalleryImageService(supabase);
  const storyService = new LoveStoryService(supabase);
  const giftService = new GiftAccountService(supabase);
  const wishService = new WishService(supabase);

  // Fetch all related data concurrently
  const [persons, events, gallery, stories, gifts, wishes] = await Promise.all([
    personService.getByInvitationId(invitation.id),
    eventService.getByInvitationId(invitation.id),
    galleryService.getByInvitationId(invitation.id),
    storyService.getByInvitationId(invitation.id),
    giftService.getByInvitationId(invitation.id),
    wishService.getByInvitationId(invitation.id),
  ]);

  // Map to Template Format with Zod Validation
  // We use .passthrough() because the input schemas do not define db-generated fields (id, created_at, etc)
  // We cast back to original array types so TS knows `id` exists.
  const validPersons = persons.map(
    (p) => personSchema.passthrough().parse(p) as unknown as typeof p
  );
  const validEvents = events.map(
    (e) => weddingeventSchema.passthrough().parse(e) as unknown as typeof e
  );
  const validGallery = gallery.map(
    (g) => galleryimageSchema.passthrough().parse(g) as unknown as typeof g
  );
  const validStories = stories.map(
    (s) => lovestorySchema.passthrough().parse(s) as unknown as typeof s
  );
  const validGifts = gifts.map(
    (g) => giftaccountSchema.passthrough().parse(g) as unknown as typeof g
  );
  const validWishes = wishes.map((w) => wishSchema.passthrough().parse(w) as unknown as typeof w);

  const groom = validPersons.find((p) => p.role === "groom");
  const bride = validPersons.find((p) => p.role === "bride");

  const mappedData = {
    couple: {
      groom: groom
        ? {
            fullName: groom.full_name,
            nickname: groom.name,
            parents: `Putra dari Bapak ${groom.father_name} & Ibu ${groom.mother_name}`,
            instagram: groom.instagram_username || undefined,
            description: groom.description || undefined,
          }
        : undefined,
      bride: bride
        ? {
            fullName: bride.full_name,
            nickname: bride.name,
            parents: `Putri dari Bapak ${bride.father_name} & Ibu ${bride.mother_name}`,
            instagram: bride.instagram_username || undefined,
            description: bride.description || undefined,
          }
        : undefined,
    },
    events: validEvents.map((e) => ({
      id: e.id,
      name: e.title,
      date: `${e.date}T${e.start_time}`,
      endDate: e.end_time ? `${e.date}T${e.end_time}` : undefined,
      locationName: e.location_name,
      address: e.address,
      mapUrl: e.google_maps_url || undefined,
    })),
    gallery: validGallery.map((g) => ({
      id: g.id,
      url: g.url,
      alt: g.caption || undefined,
    })),
    story: validStories.map((s) => ({
      id: s.id,
      date: s.date_text,
      title: s.title,
      description: s.description,
    })),
    gifts: validGifts.map((g) => ({
      id: g.id,
      type: g.is_ewallet ? "qr" : "bank",
      bank: g.bank_name,
      accountNumber: g.account_number,
      accountName: g.account_name,
    })),
    quote: {
      text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri...",
      author: "Ar-Rum: 21",
    },
    wishes: validWishes.map((w) => ({
      id: w.id,
      name: w.guest_name,
      time: w.created_at, // ISO string, relative time will be formatted in UI
      text: w.message,
    })),
  };

  const themeId = invitation.theme === "darsana-premium" ? "darsana" : invitation.theme;

  return <TemplateRenderer themeId={themeId} data={mappedData} />;
}
