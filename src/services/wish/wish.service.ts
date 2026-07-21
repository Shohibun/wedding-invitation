import { Wish } from "@/types/wish";

interface CreateWishPayload {
  invitationId: string;
  guestName: string;
  message: string;
}

export class WishService {
  /**
   * Mengambil daftar ucapan untuk undangan
   */
  static async getWishes(_invitationId: string): Promise<Wish[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [];
  }

  /**
   * Mengirim ucapan doa baru dari form
   */
  static async submitWish(payload: CreateWishPayload): Promise<Wish> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      id: `wish-${Date.now()}`,
      invitationId: payload.invitationId,
      guestName: payload.guestName,
      message: payload.message,
      createdAt: new Date(),
      status: "pending",
    };
  }
}
