import { Draft } from "./types";
import { DraftDataSchema } from "./schema";
import { draftRepository } from "./repository";
import { SupabaseClient } from "@supabase/supabase-js";

export const DraftService = {
  /**
   * Retrieves a draft for the given invitation, ready for the Builder.
   */
  getDraft: async (invitationId: string, customClient?: SupabaseClient): Promise<Draft | null> => {
    return await draftRepository.loadDraft(invitationId, customClient);
  },

  /**
   * Validates and saves a draft update.
   */
  saveDraft: async (
    invitationId: string,
    payload: { payload: Record<string, unknown> },
    customClient?: SupabaseClient
  ): Promise<Draft> => {
    // 1. Strict Zod Validation of the payload data
    const validatedData = DraftDataSchema.parse(payload.payload);

    return await draftRepository.saveDraft(invitationId, { payload: validatedData }, customClient);
  },

  /**
   * Prepares the raw draft payload for the Builder.
   * This acts as the deserialize step ensuring it conforms to the TemplateConfig format.
   */
  prepareBuilderData: (draft: Draft) => {
    if (!draft || !draft.payload) return null;
    return draft.payload;
  },

  /**
   * Serializes the Builder state back into a strict draft payload.
   */
  serializeBuilderData: (builderState: unknown): { payload: Record<string, unknown> } => {
    return {
      payload: builderState as Record<string, unknown>,
    };
  },
};
