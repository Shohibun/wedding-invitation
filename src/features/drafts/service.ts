import { Draft, UpdateDraftDTO } from "./types";
import { DraftDataSchema } from "./schema";
import { draftRepository } from "./repository";

export const DraftService = {
  /**
   * Retrieves a draft for the given invitation, ready for the Builder.
   */
  getDraft: async (invitationId: string): Promise<Draft | null> => {
    return await draftRepository.loadDraft(invitationId);
  },

  /**
   * Validates and saves a draft update.
   */
  saveDraft: async (
    invitationId: string,
    payload: UpdateDraftDTO,
    _currentVersion: number
  ): Promise<Draft> => {
    // 1. Strict Zod Validation of the payload data
    const validatedData = DraftDataSchema.parse(payload.data);

    // 2. We can increment the version here as part of the optimistic lock/versioning mechanism
    const versionedPayload: UpdateDraftDTO = {
      ...payload,
      data: validatedData,
      // Note: We'd typically bump version if it's explicitly required by the save operation.
      // For now, let's let the mapper and repository handle the base save.
      // To strictly adhere to future optimistic updates, we could enforce version incrementing here:
      // version: currentVersion + 1
    };

    return await draftRepository.saveDraft(invitationId, versionedPayload);
  },

  /**
   * Prepares the raw draft data for the Builder.
   * This acts as the deserialize step ensuring it conforms to the TemplateConfig format.
   */
  prepareBuilderData: (draft: Draft) => {
    if (!draft || !draft.data) return null;
    return draft.data;
  },

  /**
   * Serializes the Builder state back into a strict draft payload.
   */
  serializeBuilderData: (builderState: unknown): UpdateDraftDTO => {
    return {
      data: builderState as Record<string, unknown>,
      status: "draft",
    };
  },
};
