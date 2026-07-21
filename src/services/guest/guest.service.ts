import { Guest } from "@/types/guest";

export class GuestService {
  /**
   * Mengambil daftar tamu untuk ditampilkan di dashboard
   */
  static async getGuests(invitationId: string): Promise<Guest[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        id: "gst-1",
        invitationId,
        name: "Budi Santoso",
        slug: "budi-santoso",
        status: "pending",
        pax: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
