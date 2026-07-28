import { VisitorSession } from "./types";

export const VisitorMapper = {
  toDomain(row: Record<string, unknown>): VisitorSession {
    return {
      id: row.id as string,
      invitationId: row.invitation_id as string,
      guestId: (row.guest_id as string | null) || null,
      sessionId: row.session_id as string,
      startedAt: row.started_at as string,
      endedAt: (row.ended_at as string | undefined) || undefined,
      duration: (row.duration as number | undefined) || undefined,
      device: (row.device as string | undefined) || undefined,
      browser: (row.browser as string | undefined) || undefined,
      os: (row.os as string | undefined) || undefined,
      viewportWidth: (row.viewport_width as number | undefined) || undefined,
      viewportHeight: (row.viewport_height as number | undefined) || undefined,
      language: (row.language as string | undefined) || undefined,
      timezone: (row.timezone as string | undefined) || undefined,
      referrer: (row.referrer as string | undefined) || undefined,
      entryPath: (row.entry_path as string | undefined) || undefined,
      exitPath: (row.exit_path as string | undefined) || undefined,
      visitCount: (row.visit_count as number) || 1,
      isReturning: (row.is_returning as boolean) || false,
      ipHash: (row.ip_hash as string | undefined) || undefined,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    };
  },

  toPersistence(domain: VisitorSession): Record<string, unknown> {
    const payload: Record<string, unknown> = {
      id: domain.id,
      invitation_id: domain.invitationId,
      session_id: domain.sessionId,
      started_at: domain.startedAt,
    };

    if (domain.guestId !== undefined) payload.guest_id = domain.guestId;
    if (domain.endedAt !== undefined) payload.ended_at = domain.endedAt;
    if (domain.duration !== undefined) payload.duration = domain.duration;
    if (domain.device !== undefined) payload.device = domain.device;
    if (domain.browser !== undefined) payload.browser = domain.browser;
    if (domain.os !== undefined) payload.os = domain.os;
    if (domain.viewportWidth !== undefined) payload.viewport_width = domain.viewportWidth;
    if (domain.viewportHeight !== undefined) payload.viewport_height = domain.viewportHeight;
    if (domain.language !== undefined) payload.language = domain.language;
    if (domain.timezone !== undefined) payload.timezone = domain.timezone;
    if (domain.referrer !== undefined) payload.referrer = domain.referrer;
    if (domain.entryPath !== undefined) payload.entry_path = domain.entryPath;
    if (domain.exitPath !== undefined) payload.exit_path = domain.exitPath;
    if (domain.visitCount !== undefined) payload.visit_count = domain.visitCount;
    if (domain.isReturning !== undefined) payload.is_returning = domain.isReturning;
    if (domain.ipHash !== undefined) payload.ip_hash = domain.ipHash;

    return payload;
  },
};
