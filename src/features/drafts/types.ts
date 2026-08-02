import { Database } from "@/types/database.types";

export type Draft = Database["public"]["Tables"]["drafts"]["Row"];
export type DraftInsert = Database["public"]["Tables"]["drafts"]["Insert"];
export type DraftUpdate = Database["public"]["Tables"]["drafts"]["Update"];

export interface DraftRepositoryPort {
  loadDraft(invitationId: string): Promise<Draft | null>;
  saveDraft(invitationId: string, payload: unknown): Promise<Draft>;
}

export type UpdateDraftDTO = Record<string, unknown>;
