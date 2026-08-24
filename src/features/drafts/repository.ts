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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawData = payload.payload as Record<string, any>;

    // Always update localStorage backup first for client-side persistence
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`draft_backup_${invitationId}`, JSON.stringify(rawData));
      } catch {
        // Ignore storage write error
      }
    }

    try {
      const supabase = createClient();
      const dbPayload = DraftMapper.toPersistence(payload);

      // 1. Update the invitations table directly so updated_at & title in Supabase change immediately
      try {
        const updateFields: Record<string, unknown> = {
          updated_at: new Date().toISOString(),
        };

        if (rawData?.cover?.title || rawData?.title) {
          updateFields.title = (rawData?.cover?.title || rawData?.title) as string;
        }
        if (rawData?.theme) {
          updateFields.theme = rawData.theme as string;
        }

        await supabase.from("invitations").update(updateFields).eq("id", invitationId);
      } catch {
        // Continue to drafts table upsert
      }

      // 2. Upsert the full configuration payload into the drafts table
      const { data, error } = await supabase
        .from("drafts")
        .upsert(
          {
            invitation_id: invitationId,
            payload: dbPayload,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "invitation_id" }
        )
        .select("invitation_id, payload, created_at, updated_at")
        .single();

      if (error || !data) {
        return {
          invitation_id: invitationId,
          payload: rawData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }

      return DraftMapper.toDomain(data);
    } catch {
      return {
        invitation_id: invitationId,
        payload: rawData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
  }
}

export const draftRepository = new DraftRepositoryImpl();
