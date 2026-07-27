import { TrackEventPayloadSchema } from "./schema";
import { TrackEventPayload } from "./types";
import { AnalyticsValidationError } from "./errors";

export const AnalyticsValidator = {
  validatePayload(payload: unknown): TrackEventPayload {
    const result = TrackEventPayloadSchema.safeParse(payload);

    if (!result.success) {
      throw new AnalyticsValidationError(
        "Invalid analytics event payload",
        result.error.flatten().fieldErrors
      );
    }

    return result.data;
  },

  validateBatch(payloads: unknown[]): TrackEventPayload[] {
    return payloads.map((p) => this.validatePayload(p));
  },
};
