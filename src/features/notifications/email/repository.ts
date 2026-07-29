import {
  CreateEmailDeliveryDTO,
  CreateEmailMessageDTO,
  EmailDelivery,
  EmailMessage,
  EmailRepositoryPort,
} from "./types";
import { v4 as uuidv4 } from "uuid";
import { EmailDeliveryStatus } from "./status";

class EmailRepositoryImpl implements EmailRepositoryPort {
  private messages: Map<string, EmailMessage> = new Map();
  private deliveries: Map<string, EmailDelivery> = new Map();

  async createMessage(data: CreateEmailMessageDTO): Promise<EmailMessage> {
    const message: EmailMessage = {
      id: uuidv4(),
      ...data,
    };
    this.messages.set(message.id, message);
    return message;
  }

  async findMessageById(id: string): Promise<EmailMessage | null> {
    return this.messages.get(id) || null;
  }

  async listMessagesByNotificationId(notificationId: string): Promise<EmailMessage[]> {
    return Array.from(this.messages.values()).filter((m) => m.notificationId === notificationId);
  }

  async createDelivery(data: CreateEmailDeliveryDTO): Promise<EmailDelivery> {
    const delivery: EmailDelivery = {
      id: uuidv4(),
      ...data,
    };
    this.deliveries.set(delivery.id, delivery);
    return delivery;
  }

  async updateDeliveryStatus(
    id: string,
    status: EmailDeliveryStatus,
    error?: string
  ): Promise<EmailDelivery> {
    const delivery = await this.findDeliveryById(id);
    if (!delivery) throw new Error("Delivery not found");

    const updated: EmailDelivery = { ...delivery, status };
    if (error) updated.error = error;

    const now = new Date().toISOString();
    if (status === "sent") updated.sentAt = now;
    if (status === "delivered") updated.deliveredAt = now;
    if (status === "failed") updated.failedAt = now;

    this.deliveries.set(id, updated);
    return updated;
  }

  async findDeliveryById(id: string): Promise<EmailDelivery | null> {
    return this.deliveries.get(id) || null;
  }
}

export const emailRepository = new EmailRepositoryImpl();
