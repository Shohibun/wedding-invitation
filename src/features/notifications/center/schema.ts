import { z } from "zod";
import { NotificationSchema } from "../schema"; // Re-use core notification schema
import { NOTIFICATION_CATEGORIES } from "./constants";

export const NotificationCategorySchema = z.enum(NOTIFICATION_CATEGORIES);

export const NotificationPreferenceSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  enabled: z.boolean().default(true),
  channels: z.record(z.string(), z.boolean()),
  categories: z.record(z.string(), z.boolean()),
  quietHours: z
    .object({
      enabled: z.boolean().default(false),
      start: z.string().optional(), // HH:mm format
      end: z.string().optional(),
      timezone: z.string().default("UTC"),
    })
    .optional(),
  timezone: z.string().default("UTC"),
  digestMode: z.boolean().default(false),
  preferredLanguage: z.string().default("en"),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const NotificationHistorySchema = z.object({
  id: z.string().uuid(),
  notificationId: z.string().uuid(),
  notification: NotificationSchema, // The aggregate root wraps the business logic entity
  isRead: z.boolean().default(false),
  readAt: z.string().datetime().optional(),
  viewedAt: z.string().datetime().optional(),
  archivedAt: z.string().datetime().optional(),
  lastInteractionAt: z.string().datetime().optional(),
  pinned: z.boolean().default(false),
  dismissedAt: z.string().datetime().optional(),
});

export const NotificationFilterSchema = z.object({
  channel: z.array(z.string()).optional(),
  status: z.array(z.string()).optional(),
  priority: z.array(z.string()).optional(),
  category: z.array(z.string()).optional(),
  dateRange: z
    .object({
      start: z.string().datetime().optional(),
      end: z.string().datetime().optional(),
    })
    .optional(),
  isRead: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  guestId: z.string().optional(),
  invitationId: z.string().optional(),
});

export const NotificationSearchSchema = z.object({
  query: z.string().min(1),
  fields: z
    .array(z.enum(["subject", "body", "guest", "invitation", "category", "status", "channel"]))
    .optional(),
});
