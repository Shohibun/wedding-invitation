import {
  Notification,
  NotificationChannel,
  NotificationPriority,
  NotificationStatus,
  NotificationType,
} from "./types";

export const NotificationMapper = {
  toDomain(row: Record<string, unknown>): Notification {
    return {
      id: row.id as string,
      invitationId: row.invitation_id as string,
      guestId: row.guest_id as string | undefined,
      channel: row.channel as NotificationChannel,
      type: row.type as NotificationType,
      subject: row.subject as string | undefined,
      title: row.title as string,
      body: row.body as string,
      variables: (row.variables as Record<string, string>) || {},
      status: row.status as NotificationStatus,
      priority: row.priority as NotificationPriority,
      scheduledAt: row.scheduled_at as string | undefined,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    };
  },

  toRow(domain: Notification): Record<string, unknown> {
    return {
      id: domain.id,
      invitation_id: domain.invitationId,
      guest_id: domain.guestId,
      channel: domain.channel,
      type: domain.type,
      subject: domain.subject,
      title: domain.title,
      body: domain.body,
      variables: domain.variables,
      status: domain.status,
      priority: domain.priority,
      scheduled_at: domain.scheduledAt,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    };
  },
};
