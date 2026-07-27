import { createClient } from "../../lib/supabase/client";
import { Draft, DraftRepositoryPort, UpdateDraftDTO } from "./types";
import { DraftMapper } from "./mapper";

class DraftRepositoryImpl implements DraftRepositoryPort {
  /**
   * Loads the draft data for a specific invitation.
   */
  async loadDraft(invitationId: string): Promise<Draft | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("invitations")
      .select("id, draft_version, draft_status, draft_data, draft_updated_at, draft_updated_by")
      .eq("id", invitationId)
      .single();

    if (error) {
      console.error(
        `[DraftRepository] Failed to load draft for invitation ${invitationId}:`,
        error
      );
      return null;
    }

    if (!data) return null;

    return DraftMapper.toDomain(data);
  }

  /**
   * Saves updates to the draft data for a specific invitation.
   * Uses JSONB merging if necessary, but here we replace the draft_data object directly.
   */
  async saveDraft(invitationId: string, payload: UpdateDraftDTO): Promise<Draft> {
    const supabase = createClient();

    const dbPayload = DraftMapper.toPersistence(payload);

    // We increment the version strictly on the database side or service side.
    // Here we let the Service layer manage the version number inside the payload.

    const { data, error } = await supabase
      .from("invitations")
      .update(dbPayload)
      .eq("id", invitationId)
      .select("id, draft_version, draft_status, draft_data, draft_updated_at, draft_updated_by")
      .single();

    if (error) {
      throw new Error(`[DraftRepository] Failed to save draft: ${error.message}`);
    }

    return DraftMapper.toDomain(data);
  }
}

export const draftRepository = new DraftRepositoryImpl();
