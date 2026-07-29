import {
  CreateTemplateDTO,
  NotificationTemplateV2,
  NotificationVariable,
  TemplateRepositoryPort,
  UpdateTemplateDTO,
} from "./types";
import { v4 as uuidv4 } from "uuid";

class TemplateRepositoryImpl implements TemplateRepositoryPort {
  private templates: Map<string, NotificationTemplateV2> = new Map();

  async createTemplate(
    data: CreateTemplateDTO,
    variables: NotificationVariable[]
  ): Promise<NotificationTemplateV2> {
    const now = new Date().toISOString();
    const template: NotificationTemplateV2 = {
      id: uuidv4(),
      name: data.name,
      description: data.description,
      channel: data.channel,
      subject: data.subject,
      body: data.body,
      variables,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.templates.set(template.id, template);
    return template;
  }

  async updateTemplate(
    id: string,
    data: UpdateTemplateDTO,
    variables?: NotificationVariable[]
  ): Promise<NotificationTemplateV2> {
    const existing = await this.findTemplateById(id);
    if (!existing) throw new Error("Template not found");

    const updated: NotificationTemplateV2 = {
      ...existing,
      ...data,
      variables: variables || existing.variables,
      version: existing.version + 1,
      updatedAt: new Date().toISOString(),
    };

    this.templates.set(id, updated);
    return updated;
  }

  async deleteTemplate(id: string): Promise<void> {
    this.templates.delete(id);
  }

  async findTemplateById(id: string): Promise<NotificationTemplateV2 | null> {
    return this.templates.get(id) || null;
  }

  async listTemplates(channel?: string): Promise<NotificationTemplateV2[]> {
    const all = Array.from(this.templates.values());
    if (channel) {
      return all.filter((t) => t.channel === channel);
    }
    return all;
  }
}

export const templateRepository = new TemplateRepositoryImpl();
