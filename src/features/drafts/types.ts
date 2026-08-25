import { Database } from "@/types/database.types";

export type Draft = Database["public"]["Tables"]["drafts"]["Row"];
export type DraftInsert = Database["public"]["Tables"]["drafts"]["Insert"];
export type DraftUpdate = Database["public"]["Tables"]["drafts"]["Update"];

import { SupabaseClient } from "@supabase/supabase-js";

export interface DraftRepositoryPort {
  loadDraft(invitationId: string, client?: SupabaseClient): Promise<Draft | null>;
  saveDraft(invitationId: string, payload: unknown, client?: SupabaseClient): Promise<Draft>;
}

export type UpdateDraftDTO = Record<string, unknown>;
