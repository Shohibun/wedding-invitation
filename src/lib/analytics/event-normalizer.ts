import { TrackEventPayload } from "../../features/analytics/types";

/**
 * Ensures that incoming event payloads conform to expected structural norms
 * before they enter the queue or hit the validation boundary.
 */
export const EventNormalizer = {
  normalize(payload: Partial<TrackEventPayload>): TrackEventPayload {
    // We enforce that the timestamp is a valid ISO string.
    // If it's missing or invalid, we inject a fresh one.
    let timestamp = payload.timestamp;
    if (!timestamp) {
      timestamp = new Date().toISOString();
    } else {
      try {
        new Date(timestamp).toISOString();
      } catch {
        timestamp = new Date().toISOString();
      }
    }

    // Ensure metadata is always an object, preventing null/undefined leaks
    const metadata =
      payload.metadata && typeof payload.metadata === "object" ? payload.metadata : {};

    return {
      ...(payload as TrackEventPayload),
      metadata,
      timestamp,
    };
  },
};
