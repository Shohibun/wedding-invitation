import { z } from "zod";
import { AnalyticsEventSchema, TrackEventPayloadSchema } from "./schema";
import { AnalyticsEventType } from "./analytics-events";

export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;
export type TrackEventPayload = z.infer<typeof TrackEventPayloadSchema>;

export interface AnalyticsRepositoryPort {
  createEvent(event: AnalyticsEvent): Promise<AnalyticsEvent>;
  batchCreateEvents(events: AnalyticsEvent[]): Promise<AnalyticsEvent[]>;
  getEventById(id: string): Promise<AnalyticsEvent | null>;
  getEventsByInvitation(invitationId: string, limit?: number): Promise<AnalyticsEvent[]>;
  getEventsBySession(sessionId: string): Promise<AnalyticsEvent[]>;
  getEventsByGuest(guestId: string): Promise<AnalyticsEvent[]>;
  deleteEvent(id: string): Promise<void>;
}

// Re-export type for ease of use
export type { AnalyticsEventType };
