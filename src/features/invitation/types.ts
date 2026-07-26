export interface Invitation {
  id: string;
  user_id: string;
  slug: string;
  theme: string;
  music_auto_play: boolean;
  locale: string;
  sections_order: string[];
  status: "draft" | "published" | "archived";
  published_at: string | null;
  is_public: boolean;
  draft_data?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface InvitationWithDetails extends Invitation {
  persons?: { name: string; role: string }[];
  gallery_images?: { url: string }[];
}
