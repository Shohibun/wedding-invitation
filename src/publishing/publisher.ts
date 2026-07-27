import { VersionService } from "../features/versions/service";
import { PublishContext, PublishError, PublishResult } from "./types";

export class Publisher {
  /**
   * Commits the strictly validated draft into the Version History Engine.
   */
  async commit(context: PublishContext): Promise<PublishResult> {
    try {
      // The VersionService encapsulates Snapshot generation and Draft marking.
      const version = await VersionService.publishVersion(
        context.invitationId,
        context.message,
        context.publishedBy
      );

      return {
        status: "success",
        versionId: version.id,
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
