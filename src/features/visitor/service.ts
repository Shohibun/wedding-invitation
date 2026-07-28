import { v4 as uuidv4 } from "uuid";
import { visitorRepository } from "./repository";
import { AnalyticsService } from "../analytics/service";
import { VisitorSession, DeviceInfo, Viewport, ScrollMetrics } from "./types";
import { VisitorValidator } from "./validation";
import { VisitorSessionLogic } from "./session";

export const VisitorService = {
  async startTracking(
    invitationId: string,
    guestId: string | null,
    deviceInfo: DeviceInfo,
    viewport: Viewport,
    referrer: string,
    entryPath: string
  ): Promise<VisitorSession> {
    const session: VisitorSession = {
      id: uuidv4(),
      sessionId: uuidv4(),
      invitationId,
      guestId,
      startedAt: new Date().toISOString(),
      device: deviceInfo.device,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      language: deviceInfo.language,
      timezone: deviceInfo.timezone,
      viewportWidth: viewport.width,
      viewportHeight: viewport.height,
      referrer,
      entryPath,
      visitCount: 1, // Will be overridden or aggregated securely on backend later if needed
      isReturning: false,
    };

    const validatedSession = VisitorValidator.validateSession(session);
    const createdSession = await visitorRepository.createSession(validatedSession);

    // Also dispatch to the Analytics Layer so we can view "SESSION_START" in timelines
    await AnalyticsService.trackEvent({
      invitationId,
      guestId,
      sessionId: createdSession.sessionId,
      eventType: "SESSION_START",
      metadata: { referrer, entryPath },
    });

    return createdSession;
  },

  async updateSession(session: VisitorSession): Promise<VisitorSession> {
    const validatedSession = VisitorValidator.validateSession(session);
    return await visitorRepository.updateSession(validatedSession);
  },

  async stopTracking(session: VisitorSession, exitPath: string): Promise<void> {
    const closedSession = VisitorSessionLogic.closeSession({
      ...session,
      exitPath,
    });

    await visitorRepository.closeSession(
      closedSession.sessionId,
      closedSession.endedAt!,
      closedSession.duration!
    );

    // Also update the row with exit path if needed via full update
    await this.updateSession(closedSession);

    await AnalyticsService.trackEvent({
      invitationId: session.invitationId,
      guestId: session.guestId,
      sessionId: session.sessionId,
      eventType: "SESSION_END",
      metadata: { duration: closedSession.duration, exitPath },
    });
  },

  // Handlers for specific tracking events that bridge into Analytics Core

  async trackScroll(session: VisitorSession, metrics: ScrollMetrics): Promise<void> {
    await AnalyticsService.trackEvent({
      invitationId: session.invitationId,
      guestId: session.guestId,
      sessionId: session.sessionId,
      eventType: "SCROLL_DEPTH",
      metadata: { ...metrics },
    });
  },

  async trackIdle(_session: VisitorSession, _idleTimeMs: number): Promise<void> {
    // We could create an IDLE event in Analytics Core, but typically we might just note it
    // For now we map it to metadata in a tracking event or a custom one if added later.
  },
};
