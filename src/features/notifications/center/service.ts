import {
  NotificationHistory,
  NotificationFilter,
  NotificationSearch,
  NotificationGroup,
  NotificationSearchResult,
  NotificationPreference,
  UpdatePreferenceDTO,
} from "./types";
import { notificationCenterRepository } from "./repository";
import { FilterEngine } from "./filters";
import { SearchEngine } from "./search";
import { GroupingEngine } from "./grouping";
import { NotificationSortUtil } from "../../../lib/notifications/center/notification-sort";
import { NotificationHistoryManager } from "./history";
import { NotificationActions } from "./actions";

export const NotificationCenterService = {
  // --- HISTORY MANAGEMENT ---
  async getFeed(
    userId: string,
    filter?: NotificationFilter,
    search?: NotificationSearch
  ): Promise<NotificationSearchResult> {
    let notifications = await notificationCenterRepository.listHistory(userId);

    // Default exclude archived unless requested
    if (!filter || filter.isArchived === undefined) {
      notifications = notifications.filter((n) => !n.archivedAt);
    }

    if (filter) {
      notifications = FilterEngine.apply(notifications, filter);
    }

    if (search) {
      const searchResult = SearchEngine.search(notifications, search);
      notifications = searchResult.notifications;
    }

    notifications = NotificationSortUtil.sortByDate(notifications, "desc");

    return {
      notifications,
      total: notifications.length,
    };
  },

  async getGroupedFeed(
    userId: string,
    groupBy: "time" | "category" = "time"
  ): Promise<NotificationGroup[]> {
    const { notifications } = await this.getFeed(userId);
    if (groupBy === "category") {
      return GroupingEngine.groupByCategory(notifications);
    }
    return GroupingEngine.groupByDate(notifications);
  },

  // --- ACTIONS ---
  async markAsRead(id: string): Promise<NotificationHistory> {
    const history = await notificationCenterRepository.findHistoryById(id);
    if (!history) throw new Error("Not found");

    const updated = NotificationHistoryManager.markAsRead(history);
    return notificationCenterRepository.updateHistory(id, updated);
  },

  async markAsUnread(id: string): Promise<NotificationHistory> {
    const history = await notificationCenterRepository.findHistoryById(id);
    if (!history) throw new Error("Not found");

    const updated = NotificationHistoryManager.markAsUnread(history);
    return notificationCenterRepository.updateHistory(id, updated);
  },

  async archive(id: string): Promise<NotificationHistory> {
    const history = await notificationCenterRepository.findHistoryById(id);
    if (!history) throw new Error("Not found");

    const updated = NotificationHistoryManager.archive(history);
    return notificationCenterRepository.updateHistory(id, updated);
  },

  async restore(id: string): Promise<NotificationHistory> {
    const history = await notificationCenterRepository.findHistoryById(id);
    if (!history) throw new Error("Not found");

    const updated = NotificationHistoryManager.restore(history);
    return notificationCenterRepository.updateHistory(id, updated);
  },

  async cancel(id: string): Promise<void> {
    const history = await notificationCenterRepository.findHistoryById(id);
    if (!history) throw new Error("Not found");
    NotificationActions.validateCancel(history);

    // In real app, this would reach out to NotificationDispatcher to cancel the job
    // For now we just mark the aggregate
    await notificationCenterRepository.updateHistory(id, {
      lastInteractionAt: new Date().toISOString(),
    });
  },

  // --- PREFERENCES ---
  async getPreferences(userId: string): Promise<NotificationPreference> {
    return notificationCenterRepository.getPreferences(userId);
  },

  async updatePreferences(
    userId: string,
    data: UpdatePreferenceDTO
  ): Promise<NotificationPreference> {
    return notificationCenterRepository.updatePreferences(userId, data);
  },
};
