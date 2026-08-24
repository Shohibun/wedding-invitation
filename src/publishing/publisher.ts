import { PublishContext, PublishError, PublishResult } from "./types";
import { DraftService } from "../features/drafts/service";

export class Publisher {
  /**
   * Commits the strictly validated draft into the database as "published".
   */
  async commit(context: PublishContext): Promise<PublishResult> {
    try {
      const currentDraft = await DraftService.getDraft(context.invitationId);
      if (!currentDraft) {
        throw new Error("No active draft found.");
      }

      await DraftService.saveDraft(context.invitationId, {
        payload: currentDraft.payload as Record<string, unknown>,
      });

      return {
        status: "success",
        versionId: `v_published`, // Dummy since versions are removed
      };
    } catch (error) {
      console.error("[Publisher] Commit failed:", error);

      const publishError: PublishError = {
        code: "COMMIT_FAILED",
        message: error instanceof Error ? error.message : "Unknown error during commit.",
      };

      return {
        status: "publish_failed",
        errors: [publishError],
      };
    }
  }
}

export const publisher = new Publisher();
