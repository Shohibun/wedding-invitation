import { z } from "zod";
import {
  NotificationPreferenceSchema,
  NotificationHistorySchema,
  NotificationFilterSchema,
  NotificationSearchSchema,
} from "./schema";

export type NotificationPreference = z.infer<typeof NotificationPreferenceSchema>;
export type NotificationHistory = z.infer<typeof NotificationHistorySchema>;
export type NotificationFilter = z.infer<typeof NotificationFilterSchema>;
export type NotificationSearch = z.infer<typeof NotificationSearchSchema>;

export interface NotificationSearchResult {
  notifications: NotificationHistory[];
  total: number;
}

export interface NotificationGroup {
  id: string;
  title: string;
  items: NotificationHistory[];
}

export type UpdatePreferenceDTO = Partial<
  Omit<NotificationPreference, "id" | "userId" | "createdAt" | "updatedAt">
>;

export interface NotificationCenterRepositoryPort {
  // History Aggregate
  listHistory(userId: string): Promise<NotificationHistory[]>;
  findHistoryById(id: string): Promise<NotificationHistory | null>;
  findHistoryByNotificationId(notificationId: string): Promise<NotificationHistory | null>;
  updateHistory(id: string, updates: Partial<NotificationHistory>): Promise<NotificationHistory>;

  // Preferences
  getPreferences(userId: string): Promise<NotificationPreference>;
  updatePreferences(userId: string, data: UpdatePreferenceDTO): Promise<NotificationPreference>;
}
