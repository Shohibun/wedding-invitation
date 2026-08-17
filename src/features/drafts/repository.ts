import { createClient } from "../../lib/supabase/client";
import { Draft, DraftRepositoryPort, UpdateDraftDTO } from "./types";
import { DraftMapper } from "./mapper";

class DraftRepositoryImpl implements DraftRepositoryPort {
  /**
   * Loads the draft data for a specific invitation.
   */
  async loadDraft(invitationId: string): Promise<Draft | null> {
    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("drafts")
        .select("invitation_id, payload, created_at, updated_at")
        .eq("invitation_id", invitationId)
        .single();

      if (error) {
        return null;
      }

      if (!data) return null;

      return DraftMapper.toDomain(data);
    } catch {
      return null;
    }
  }

  /**
   * Saves updates to the draft data for a specific invitation.
   */
  async saveDraft(invitationId: string, payload: UpdateDraftDTO): Promise<Draft> {
    try {
      const supabase = createClient();
      const dbPayload = DraftMapper.toPersistence(payload);

      const { data, error } = await supabase
        .from("drafts")
        .upsert({ invitation_id: invitationId, payload: dbPayload })
        .select("invitation_id, payload, created_at, updated_at")
        .single();

      if (error) {
        // Fallback for missing drafts table or schema cache issues
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(`draft_backup_${invitationId}`, JSON.stringify(payload.payload));
          } catch {
            // Ignore storage write error
          }
        }
        return {
          invitation_id: invitationId,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          payload: payload.payload as any,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }

      return DraftMapper.toDomain(data);
    } catch {
      // Offline / LocalStorage fallback
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(`draft_backup_${invitationId}`, JSON.stringify(payload.payload));
        } catch {
          // Ignore
        }
      }
      return {
        invitation_id: invitationId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        payload: payload.payload as any,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
  }
}

export const draftRepository = new DraftRepositoryImpl();
