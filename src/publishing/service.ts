import { publishPipeline } from "./pipeline";
import { PublishContext, PublishResult } from "./types";

export const PublishService = {
  /**
   * Main entry point for the UI to publish an invitation.
   * Completely abstracted from the internal complexities of Validation and Versioning.
   */
  publish: async (context: PublishContext): Promise<PublishResult> => {
    return await publishPipeline.execute(context);
  },
};
