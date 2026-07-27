import { z } from "zod";
import { DraftSchema, UpdateDraftSchema } from "./schema";

export type Draft = z.infer<typeof DraftSchema>;
export type UpdateDraftDTO = z.infer<typeof UpdateDraftSchema>;

export interface DraftRepositoryPort {
  loadDraft(invitationId: string): Promise<Draft | null>;
  saveDraft(invitationId: string, payload: UpdateDraftDTO): Promise<Draft>;
  // Additional methods if required
}
