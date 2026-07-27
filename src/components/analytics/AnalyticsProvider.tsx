"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AnalyticsContext } from "../../lib/analytics/analytics-context";
import { AnalyticsDispatcher } from "../../lib/analytics/event-dispatcher";
import { AnalyticsEventType } from "../../features/analytics/types";

export interface AnalyticsProviderProps {
  children: React.ReactNode;
  invitationId?: string; // Optional if we are tracking generic non-invitation pages
  guestId?: string; // Optional (anonymous views)
  batchSize?: number;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
  invitationId = null,
  guestId = null,
  batchSize = 10,
}) => {
  // Maintain a persistent session ID for the lifetime of this provider
  const [sessionId] = useState<string>(() => uuidv4());

  // Maintain a persistent dispatcher for the lifetime of this provider
  const dispatcherRef = useRef(new AnalyticsDispatcher({ batchSize }));

  // Automatically flush on unmount (page leave)
  useEffect(() => {
    const currentDispatcher = dispatcherRef.current;
    return () => {
      currentDispatcher.flush();
    };
  }, []);

  const value = useMemo(() => {
    const track = (eventType: AnalyticsEventType, metadata?: Record<string, unknown>) => {
      // We safely bypass undefined invitationId by pushing an empty string or ignoring it
      // but schema requires a UUID. The Provider requires careful usage context.
      // For safe tracking, invitationId should be provided if tracking invitation events.
      dispatcherRef.current.enqueue({
        invitationId: invitationId || "00000000-0000-0000-0000-000000000000",
        sessionId,
        guestId: guestId,
        eventType,
        metadata: metadata || {},
      });
    };

    const trackImmediate = async (
      eventType: AnalyticsEventType,
      metadata?: Record<string, unknown>
    ) => {
      await dispatcherRef.current.trackImmediate({
        invitationId: invitationId || "00000000-0000-0000-0000-000000000000",
        sessionId: sessionId,
        guestId: guestId,
        eventType,
        metadata: metadata || {},
      });
    };

    return {
      invitationId,
      sessionId,
      guestId,
      track,
      trackImmediate,
      flush: async () => await dispatcherRef.current.flush(),
      queueSize: () => dispatcherRef.current.getQueueSize(),
    };
  }, [invitationId, guestId, sessionId]);

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};
