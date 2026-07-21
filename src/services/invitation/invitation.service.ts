import { Invitation } from "@/types/invitation";
import { invitationConfig } from "@/config/invitation";

export class InvitationService {
  /**
   * Mengambil data undangan berdasarkan slug URL.
   * Saat MVP, kita return data dummy yang digabung dengan slug yang diminta.
   */
  static async getInvitationBySlug(slug: string): Promise<Invitation | null> {
    // Simulasi delay jaringan (mock DB call)
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      id: "inv-123",
      userId: "user-1",
      slug,
      theme: "elegant",
      groom: invitationConfig.dummyData.groom,
      bride: invitationConfig.dummyData.bride,
      events: [],
      gallery: { images: [] },
      story: [],
      giftAccounts: [],
      wishes: [],
      settings: {
        musicAutoPlay: invitationConfig.defaults.musicAutoPlay,
        locale: invitationConfig.defaults.locale,
        sectionsOrder: invitationConfig.defaultSections,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
