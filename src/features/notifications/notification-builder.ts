import { CreateNotificationDTO, Notification } from "./types";
import { v4 as uuidv4 } from "uuid";

export const NotificationBuilder = {
  build(dto: CreateNotificationDTO): Notification {
    const now = new Date().toISOString();
    return {
      id: uuidv4(),
      invitationId: dto.invitationId,
      guestId: dto.guestId,
      channel: dto.channel,
      type: dto.type,
      subject: dto.subject,
      title: dto.title,
      body: dto.body,
      variables: dto.variables || {},
      status: "pending",
      priority: dto.priority || "normal",
      scheduledAt: dto.scheduledAt,
      createdAt: now,
      updatedAt: now,
    };
  },
};
