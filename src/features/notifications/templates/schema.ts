import { z } from "zod";
import { NotificationChannelSchema } from "../schema";

export const NotificationVariableSchema = z.object({
  key: z.string(),
  label: z.string(),
  description: z.string(),
  required: z.boolean().default(false),
  defaultValue: z.string().optional(),
});

export const NotificationTemplateV2Schema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  channel: NotificationChannelSchema,
  subject: z.string().optional(),
  body: z.string(),
  variables: z.array(NotificationVariableSchema),
  version: z.number().int().default(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CompiledTemplateSchema = z.object({
  templateId: z.string().uuid(),
  ast: z.any(), // Abstract syntax representation
  requiredVariables: z.array(z.string()),
  warnings: z.array(z.string()).optional(),
});

export const TemplatePreviewSchema = z.object({
  subject: z.string().optional(),
  body: z.string(),
  resolvedVariables: z.record(z.string(), z.string()),
  missingVariables: z.array(z.string()),
});
