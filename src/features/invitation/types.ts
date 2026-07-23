export interface Invitation {
  id: string;
  user_id: string;
  slug: string;
  theme: string;
  video_url: string | null;
  music_url: string | null;
  music_auto_play: boolean;
  locale: string;
  sections_order: string[];
  status: "draft" | "published" | "archived";
  published_at: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface InvitationWithDetails extends Invitation {
  persons?: { name: string; role: string }[];
  gallery_images?: { url: string }[];
}
