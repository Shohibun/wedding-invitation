import { RsvpStatus } from "@/types/guest";

interface RsvpPayload {
  guestId: string;
  status: RsvpStatus;
  pax: number;
}

export class RsvpService {
  /**
   * Submit data RSVP dari tamu.
   */
  static async submitRsvp(_payload: RsvpPayload): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulasi sukses menyimpan ke database
    return {
      success: true,
      message: "Terima kasih, konfirmasi kehadiran Anda telah disimpan.",
    };
  }
}
