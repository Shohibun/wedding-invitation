"use client";

import React, { useEffect, useState, useMemo } from "react";
import { TrackingContext } from "../../lib/tracking/tracking-context";
import { SessionManager } from "../../lib/tracking/session-manager";
import { VisitorSession } from "../../features/visitor/types";
import { SessionExpiredError } from "../../features/visitor/errors";

export interface TrackingProviderProps {
  children: React.ReactNode;
  invitationId: string;
  guestId?: string | null;
}

export const TrackingProvider: React.FC<TrackingProviderProps> = ({
  children,
  invitationId,
  guestId = null,
}) => {
  const [activeSession, setActiveSession] = useState<VisitorSession | null>(null);
  const [sessionManager] = useState<SessionManager>(() => new SessionManager());

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const session = await sessionManager.initialize(invitationId, guestId);
        if (mounted) {
          setActiveSession(session);
        }
      } catch (error) {
        console.error("Failed to initialize visitor tracking:", error);
      }
    };

    initialize();

    return () => {
      mounted = false;
      // Note: Page lifecycle handles the unload session closing via hooks
    };
  }, [invitationId, guestId, sessionManager]);

  const value = useMemo(() => {
    const trackActivity = () => {
      try {
        sessionManager.trackActivity();
      } catch (error) {
        if (error instanceof SessionExpiredError) {
          // Re-initialize if expired
          sessionManager
            .initialize(invitationId, guestId)
            .then((session) => setActiveSession(session))
            .catch(console.error);
        }
      }
    };

    return {
      sessionManager: sessionManager,
      activeSession,
      trackActivity,
    };
  }, [activeSession, invitationId, guestId, sessionManager]);

  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};
