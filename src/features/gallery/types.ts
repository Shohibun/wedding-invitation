export interface GalleryImage {
  id: string;
  invitation_id: string;
  url: string;
  thumbnail_url: string | null;
  caption: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}
