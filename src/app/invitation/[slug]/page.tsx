import { notFound } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { HeroSection } from "@/features/public/hero/components/hero-section";
import { OpeningSection } from "@/features/public/opening/components/opening-section";
import { CoupleSection } from "@/features/public/couple/components/couple-section";
import { CountdownSection } from "@/features/public/countdown/components/countdown-section";
import { EventsSection } from "@/features/public/events/components/events-section";
import { GallerySection } from "@/features/public/gallery/components/gallery-section";
import { StorySection } from "@/features/public/story/components/story-section";
import { GiftSection } from "@/features/public/gift/components/gift-section";
import { WishSection } from "@/features/public/wish/components/wish-section";
import { RsvpSection } from "@/features/public/rsvp/components/rsvp-section";
import { FooterSection } from "@/features/public/footer/components/footer-section";
import { MusicPlayer } from "@/features/public/music/components/music-player";
import { InvitationService } from "@/features/invitation/service";
import { CoupleService } from "@/features/couple/service";
import { EventService } from "@/features/event/service";
import { GalleryService } from "@/features/gallery/service";
import { StoryService } from "@/features/story/service";
import { GiftService } from "@/features/gift/service";
import { WishService } from "@/features/wish/service";

import { coupleSchema } from "@/features/couple/schema";
import { eventSchema } from "@/features/event/schema";
import { gallerySchema } from "@/features/gallery/schema";
import { storySchema } from "@/features/story/schema";
import { giftSchema } from "@/features/gift/schema";
import { wishSchema } from "@/features/wish/schema";
import { CoupleRepository } from "@/features/couple/repository";
import { EventRepository } from "@/features/event/repository";
import { GalleryRepository } from "@/features/gallery/repository";
import { StoryRepository } from "@/features/story/repository";
import { GiftRepository } from "@/features/gift/repository";
import { WishRepository } from "@/features/wish/repository";
import { Metadata, ResolvingMetadata } from "next";

interface InvitationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: InvitationPageProps,
  parent: ResolvingMetadata
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

  const coupleService = new CoupleService(supabase);
  const eventService = new EventService(supabase);
  const galleryService = new GalleryService(supabase);
  const storyService = new StoryService(supabase);
  const giftService = new GiftService(supabase);
  const wishService = new WishService(supabase);

  // Fetch all related data concurrently
  const [couples, events, gallery, stories, gifts, wishes] = await Promise.all([
    coupleService.getByInvitationId(invitation.id),
    eventService.getByInvitationId(invitation.id),
    galleryService.getByInvitationId(invitation.id),
    storyService.getByInvitationId(invitation.id),
    giftService.getByInvitationId(invitation.id),
    wishService.getByInvitationId(invitation.id),
  ]);

  // Map to Template Format with Zod Validation
  // We use .passthrough() because the input schemas do not define db-generated fields (id, created_at, etc)
  // We cast back to original array types so TS knows `id` exists.
  const validCouples = couples.map(
    (p) => coupleSchema.passthrough().parse(p) as unknown as typeof p
  );
  const validEvents = events.map((e) => eventSchema.passthrough().parse(e) as unknown as typeof e);
  const validGallery = gallery.map(
    (g) => gallerySchema.passthrough().parse(g) as unknown as typeof g
  );
  const validStories = stories.map(
    (s) => storySchema.passthrough().parse(s) as unknown as typeof s
  );
  const validGifts = gifts.map((g) => giftSchema.passthrough().parse(g) as unknown as typeof g);
  const validWishes = wishes.map((w) => wishSchema.passthrough().parse(w) as unknown as typeof w);

  const groom = validCouples.find((p) => p.role === "groom");
  const bride = validCouples.find((p) => p.role === "bride");

  const mappedData = {
    couple: {
      groom: groom
        ? {
            fullName: groom.full_name,
            nickname: groom.name,
            parents: `Putra dari Bapak ${groom.father_name} & Ibu ${groom.mother_name}`,
            instagram: groom.instagram || undefined,
            photoUrl: groom.photo_url || undefined,
          }
        : undefined,
      bride: bride
        ? {
            fullName: bride.full_name,
            nickname: bride.name,
            parents: `Putri dari Bapak ${bride.father_name} & Ibu ${bride.mother_name}`,
            instagram: bride.instagram || undefined,
            photoUrl: bride.photo_url || undefined,
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

  return (
    <main className="min-h-screen bg-background">
      <MusicPlayer url={undefined} autoPlay={invitation.music_auto_play} />
      <HeroSection
        title={mappedData.couple.groom?.nickname + " & " + mappedData.couple.bride?.nickname}
        date={mappedData.events[0]?.date || ""}
      />
      <OpeningSection quote={mappedData.quote} />
      <CoupleSection groom={mappedData.couple.groom} bride={mappedData.couple.bride} />
      {mappedData.events[0] && <CountdownSection targetDate={mappedData.events[0].date} />}
      <EventsSection events={mappedData.events} />
      <StorySection stories={mappedData.story} />
      <GallerySection images={mappedData.gallery} />
      <GiftSection gifts={mappedData.gifts} />
      <RsvpSection invitationId={invitation.id} />
      <WishSection wishes={mappedData.wishes} />
      <FooterSection title={invitation.title || "Wedding Invitation"} />
    </main>
  );
}
