import { useEffect, useRef } from "react";
import { useVisitorTracking } from "./useVisitorTracking";
import { IdleTracker } from "../lib/tracking/idle-tracker";
import { VisitorService } from "../features/visitor/service";
import { VISITOR_CONSTANTS } from "../features/visitor/constants";

export const useSessionTracking = () => {
  const { activeSession, trackActivity } = useVisitorTracking();
  const idleTrackerRef = useRef<IdleTracker | null>(null);

  useEffect(() => {
    if (!activeSession) return;

    idleTrackerRef.current = new IdleTracker(
      VISITOR_CONSTANTS.INACTIVITY_TIMEOUT_MS,
      () => {
        // When user goes idle
        if (activeSession) {
          VisitorService.trackIdle(activeSession, VISITOR_CONSTANTS.INACTIVITY_TIMEOUT_MS).catch(
            console.error
          );
        }
      },
      () => {
        // When user becomes active again
        trackActivity();
      }
    );

    idleTrackerRef.current.start();

    return () => {
      idleTrackerRef.current?.stop();
    };
  }, [activeSession, trackActivity]);

  return { activeSession };
};
