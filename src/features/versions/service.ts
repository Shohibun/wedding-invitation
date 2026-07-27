import { versionRepository } from "./repository";
import { SnapshotGenerator } from "./snapshot";
import { CreateVersionDTO, Version } from "./types";
import { DraftService } from "../../features/drafts/service";
import { UpdateDraftDTO } from "../../features/drafts/types";

export const VersionService = {
  /**
   * Publishes the current draft into an immutable historical version snapshot.
   */
  publishVersion: async (
    invitationId: string,
    message?: string,
    publishedBy?: string
  ): Promise<Version> => {
    // 1. Fetch the absolute current state of the Draft
    const currentDraft = await DraftService.getDraft(invitationId);

    if (!currentDraft) {
      throw new Error(
        `[VersionService] Cannot publish: No active draft found for invitation ${invitationId}`
      );
    }

    // 2. Generate a strict, immutable snapshot of the Draft
    const snapshot = SnapshotGenerator.fromDraft(currentDraft);

    // 3. Determine the next version number.
    // In a high concurrency environment, this should ideally be handled via DB triggers/sequences.
    // For Sprint 15B, we determine it based on the draft's version integer.
    const newVersionNumber = currentDraft.version + 1;

    // 4. Create the CreateVersionDTO
    const payload: CreateVersionDTO = {
      invitationId,
      versionNumber: newVersionNumber,
      message,
      snapshot,
      publishedBy,
    };

    // 5. Commit to repository
    const version = await versionRepository.createVersion(payload);

    // 6. Update the Draft to reflect the newly published state (bump draft version, set status to published)
    const updateDraftPayload: UpdateDraftDTO = {
      data: currentDraft.data,
      status: "published",
    };
    await DraftService.saveDraft(invitationId, updateDraftPayload, newVersionNumber);

    return version;
  },

  /**
   * Reads a historical version snapshot safely for previewing in the Builder.
   */
  readVersion: async (versionId: string): Promise<Version | null> => {
    return await versionRepository.getVersion(versionId);
  },

  /**
   * Lists all historical versions.
   */
  listHistory: async (invitationId: string): Promise<Version[]> => {
    return await versionRepository.listVersions(invitationId);
  },

  /**
   * Prepares a historical version to be restored.
   * Note: It does NOT mutate the Version History. It instructs the DraftService
   * to overwrite the *current* mutable draft with the snapshot payload.
   */
  restoreVersion: async (versionId: string): Promise<void> => {
    const historicalVersion = await versionRepository.getVersion(versionId);

    if (!historicalVersion) {
      throw new Error(`[VersionService] Cannot restore: Version ${versionId} not found.`);
    }

    const draftUpdate: UpdateDraftDTO = {
      data: historicalVersion.snapshot,
      status: "draft",
    };

    // The current active version of the draft is fetched internally by the manager,
    // we simply inject the historical snapshot back into the active draft slot.
    // By passing '0' here, we simulate a lack of strict locking on restore for Sprint 15B.
    await DraftService.saveDraft(historicalVersion.invitationId, draftUpdate, 0);
  },
};
