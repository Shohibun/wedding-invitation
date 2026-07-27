import { useCallback } from "react";
import { useAnalytics } from "./useAnalytics";
import { AnalyticsEventType } from "../features/analytics/types";

/**
 * A highly specific wrapper around useAnalytics intended for components
 * that only need to track one specific type of event repeatedly.
 */
export const useTrackEvent = (eventType: AnalyticsEventType) => {
  const { track, trackImmediate } = useAnalytics();

  const trigger = useCallback(
    (metadata?: Record<string, unknown>) => {
      track(eventType, metadata);
    },
    [track, eventType]
  );

  const triggerImmediate = useCallback(
    async (metadata?: Record<string, unknown>) => {
      await trackImmediate(eventType, metadata);
    },
    [trackImmediate, eventType]
  );

  return { trigger, triggerImmediate };
};
