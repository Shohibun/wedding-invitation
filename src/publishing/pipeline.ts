import { DraftService } from "../features/drafts/service";
import { DraftSnapshotSchema } from "./schema";
import { PublishContext, PublishResult } from "./types";
import { publishValidator } from "./validator";
import { publisher } from "./publisher";
import { ZodIssue } from "zod";

export class PublishPipeline {
  /**
   * Executes the full publishing workflow.
   */
  async execute(context: PublishContext): Promise<PublishResult> {
    // 1. Fetch Active Draft
    const draft = await DraftService.getDraft(context.invitationId);
    if (!draft) {
      return {
        status: "publish_failed",
        errors: [{ code: "DRAFT_NOT_FOUND", message: "No active draft found." }],
      };
    }

    // 2. Strict Defensive Parsing
    const parsedData = DraftSnapshotSchema.safeParse(draft.payload);
    if (!parsedData.success) {
      return {
        status: "validation_failed",
        errors: parsedData.error.issues.map((err: ZodIssue) => ({
          code: "SCHEMA_VALIDATION_ERROR",
          message: err.message,
          details: err.path,
        })),
      };
    }

    // 3. Business Logic Validation
    const validationErrors = await publishValidator.validate(parsedData.data);
    if (validationErrors.length > 0) {
      return {
        status: "validation_failed",
        errors: validationErrors,
      };
    }

    // 4. (Future) Approval Workflow / Pre-publish Hooks can be inserted here

    // 5. Commit to Version History
    const publishResult = await publisher.commit(context);

    // 6. (Future) Post-publish Hooks / Notifications can be inserted here

    return publishResult;
  }
}

export const publishPipeline = new PublishPipeline();
