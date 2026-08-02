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
      .from("drafts")
      .select("invitation_id, payload, created_at, updated_at")
      .eq("invitation_id", invitationId)
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
   * Uses JSONB merging if necessary, but here we replace the payload object directly.
   */
  async saveDraft(invitationId: string, payload: UpdateDraftDTO): Promise<Draft> {
    const supabase = createClient();

    const dbPayload = DraftMapper.toPersistence(payload);

    const { data, error } = await supabase
      .from("drafts")
      .upsert({ invitation_id: invitationId, payload: dbPayload })
      .select("invitation_id, payload, created_at, updated_at")
      .single();

    if (error) {
      throw new Error(`[DraftRepository] Failed to save draft: ${error.message}`);
    }

    return DraftMapper.toDomain(data);
  }
}

export const draftRepository = new DraftRepositoryImpl();
