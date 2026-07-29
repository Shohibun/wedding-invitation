import {
  NotificationCenterRepositoryPort,
  NotificationHistory,
  NotificationPreference,
  UpdatePreferenceDTO,
} from "./types";
import { v4 as uuidv4 } from "uuid";

class NotificationCenterRepositoryImpl implements NotificationCenterRepositoryPort {
  private historyMap: Map<string, NotificationHistory> = new Map();
  private preferenceMap: Map<string, NotificationPreference> = new Map();

  // ----- HISTORY -----
  async listHistory(_userId: string): Promise<NotificationHistory[]> {
    // In a real app, query by userId. Here we return all for simplicity
    return Array.from(this.historyMap.values());
  }

  async findHistoryById(id: string): Promise<NotificationHistory | null> {
    return this.historyMap.get(id) || null;
  }

  async findHistoryByNotificationId(notificationId: string): Promise<NotificationHistory | null> {
    const all = Array.from(this.historyMap.values());
    return all.find((h) => h.notificationId === notificationId) || null;
  }

  async updateHistory(
    id: string,
    updates: Partial<NotificationHistory>
  ): Promise<NotificationHistory> {
    const existing = await this.findHistoryById(id);
    if (!existing) throw new Error("History not found");

    const updated = { ...existing, ...updates };
    this.historyMap.set(id, updated);
    return updated;
  }

  // Seeding method for tests
  async _seedHistory(history: NotificationHistory) {
    this.historyMap.set(history.id, history);
  }

  // ----- PREFERENCES -----
  async getPreferences(userId: string): Promise<NotificationPreference> {
    let pref = this.preferenceMap.get(userId);
    if (!pref) {
      // Lazy init default preferences
      pref = {
        id: uuidv4(),
        userId,
        enabled: true,
        channels: { email: true, whatsapp: true, sms: false },
        categories: { invitation: true, reminder: true, rsvp: true, marketing: false },
        timezone: "UTC",
        digestMode: false,
        preferredLanguage: "en",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.preferenceMap.set(userId, pref);
    }
    return pref;
  }

  async updatePreferences(
    userId: string,
    data: UpdatePreferenceDTO
  ): Promise<NotificationPreference> {
    const pref = await this.getPreferences(userId);
    const updated = {
      ...pref,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.preferenceMap.set(userId, updated);
    return updated;
  }
}

export const notificationCenterRepository = new NotificationCenterRepositoryImpl();
