import { WeddingTheme } from "@/providers/wedding-theme-provider";
import { Event } from "./event";
import { Gallery } from "./gallery";
import { GiftAccount } from "./gift";
import { StoryItem } from "./story";
import { Wish } from "./wish";

export interface Person {
  name: string; // Nickname, e.g., "Romeo"
  fullName: string;
  fatherName: string;
  motherName: string;
  instagramUsername?: string;
  photoUrl?: string;
}

export interface InvitationSettings {
  musicUrl?: string;
  musicAutoPlay: boolean;
  locale: string;
  sectionsOrder: string[]; // e.g., ["hero", "story", "event", ...]
}

export interface Invitation {
  id: string;
  userId: string; // Links to the SaaS user who owns this
  slug: string; // e.g., "romeo-juliet" for the public URL

  theme: WeddingTheme;

  groom: Person;
  bride: Person;

  // Relations
  events: Event[];
  gallery: Gallery;
  story: StoryItem[];
  giftAccounts: GiftAccount[];
  wishes: Wish[];

  settings: InvitationSettings;

  createdAt: Date;
  updatedAt: Date;
}
