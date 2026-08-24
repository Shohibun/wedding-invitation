import { z } from "zod";
import { DraftSnapshotSchema } from "./schema";

export type DraftSnapshot = z.infer<typeof DraftSnapshotSchema>;

export type PublishStatus = "success" | "validation_failed" | "publish_failed";

export interface PublishError {
  code: string;
  message: string;
  details?: unknown;
}

export interface PublishResult {
  status: PublishStatus;
  versionId?: string;
  errors?: PublishError[];
}

export interface PublishContext {
  invitationId: string;
  publishedBy?: string;
  message?: string;
}
