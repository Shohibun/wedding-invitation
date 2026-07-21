export interface GalleryImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  order: number;
}

export interface Gallery {
  images: GalleryImage[];
  videoUrl?: string; // YouTube or Vimeo link if they have a pre-wedding video
}
