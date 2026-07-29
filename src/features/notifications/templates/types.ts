import { z } from "zod";
import {
  NotificationTemplateV2Schema,
  NotificationVariableSchema,
  TemplatePreviewSchema,
  CompiledTemplateSchema,
} from "./schema";
import { NotificationChannel } from "../types";

export type NotificationTemplateV2 = z.infer<typeof NotificationTemplateV2Schema>;
export type NotificationVariable = z.infer<typeof NotificationVariableSchema>;
export type TemplatePreview = z.infer<typeof TemplatePreviewSchema>;
export type CompiledTemplate = z.infer<typeof CompiledTemplateSchema>;

export interface CreateTemplateDTO {
  name: string;
  description?: string;
  channel: NotificationChannel;
  subject?: string;
  body: string;
}

export interface UpdateTemplateDTO {
  name?: string;
  description?: string;
  subject?: string;
  body?: string;
}

export interface TemplateRepositoryPort {
  createTemplate(
    data: CreateTemplateDTO,
    variables: NotificationVariable[]
  ): Promise<NotificationTemplateV2>;
  updateTemplate(
    id: string,
    data: UpdateTemplateDTO,
    variables?: NotificationVariable[]
  ): Promise<NotificationTemplateV2>;
  deleteTemplate(id: string): Promise<void>;
  findTemplateById(id: string): Promise<NotificationTemplateV2 | null>;
  listTemplates(channel?: NotificationChannel): Promise<NotificationTemplateV2[]>;
}
