import { GalleryImage } from "@/types/gallery";

export class GalleryService {
  /**
   * Mengambil gambar galeri untuk undangan tertentu
   */
  static async getGalleryImages(_invitationId: string): Promise<GalleryImage[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock Data
    return [
      { id: "img-1", url: "https://placehold.co/600x800", order: 1 },
      { id: "img-2", url: "https://placehold.co/600x400", order: 2 },
      { id: "img-3", url: "https://placehold.co/800x600", order: 3 },
    ];
  }
}
