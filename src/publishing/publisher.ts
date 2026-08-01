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

      const newVersionNumber = currentDraft.version + 1;

      await DraftService.saveDraft(
        context.invitationId,
        {
          data: currentDraft.data,
          status: "published",
        },
        newVersionNumber
      );

      return {
        status: "success",
        versionId: `v${newVersionNumber}`,
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
