import { AnalyticsEvent } from "./types";
import { AnalyticsEventType } from "./analytics-events";

export const AnalyticsMapper = {
  toDomain(row: Record<string, unknown>): AnalyticsEvent {
    return {
      id: row.id as string,
      invitationId: row.invitation_id as string,
      guestId: (row.guest_id as string | null) || null,
      sessionId: row.session_id as string,
      eventType: row.event_type as AnalyticsEventType,
      metadata:
        typeof row.metadata === "string"
          ? JSON.parse(row.metadata)
          : ((row.metadata || {}) as Record<string, unknown>),
      device: (row.device as string | undefined) || undefined,
      browser: (row.browser as string | undefined) || undefined,
      os: (row.os as string | undefined) || undefined,
      country: (row.country as string | undefined) || undefined,
      city: (row.city as string | undefined) || undefined,
      referrer: (row.referrer as string | undefined) || undefined,
      path: (row.path as string | undefined) || undefined,
      duration: (row.duration as number | undefined) || undefined,
      ipHash: (row.ip_hash as string | undefined) || undefined,
      userAgent: (row.user_agent as string | undefined) || undefined,
      viewportWidth: (row.viewport_width as number | undefined) || undefined,
      viewportHeight: (row.viewport_height as number | undefined) || undefined,
      language: (row.language as string | undefined) || undefined,
      timezone: (row.timezone as string | undefined) || undefined,
      timestamp: row.created_at as string,
    };
  },

  toPersistence(domain: AnalyticsEvent): Record<string, unknown> {
    const payload: Record<string, unknown> = {
      id: domain.id,
      invitation_id: domain.invitationId,
      session_id: domain.sessionId,
      event_type: domain.eventType,
      created_at: domain.timestamp,
    };

    // Only map defined optional fields to save payload size
    if (domain.guestId) payload.guest_id = domain.guestId;
    if (domain.metadata && Object.keys(domain.metadata).length > 0)
      payload.metadata = domain.metadata;
    if (domain.device) payload.device = domain.device;
    if (domain.browser) payload.browser = domain.browser;
    if (domain.os) payload.os = domain.os;
    if (domain.country) payload.country = domain.country;
    if (domain.city) payload.city = domain.city;
    if (domain.referrer) payload.referrer = domain.referrer;
    if (domain.path) payload.path = domain.path;
    if (domain.duration !== undefined) payload.duration = domain.duration;
    if (domain.ipHash) payload.ip_hash = domain.ipHash;
    if (domain.userAgent) payload.user_agent = domain.userAgent;
    if (domain.viewportWidth !== undefined) payload.viewport_width = domain.viewportWidth;
    if (domain.viewportHeight !== undefined) payload.viewport_height = domain.viewportHeight;
    if (domain.language) payload.language = domain.language;
    if (domain.timezone) payload.timezone = domain.timezone;

    return payload;
  },
};
