import { v4 as uuidv4 } from "uuid";
import { analyticsRepository } from "./repository";
import { AnalyticsValidator } from "./validation";
import { AnalyticsEvent, TrackEventPayload } from "./types";
import { AnalyticsAggregator } from "./aggregation";

export const AnalyticsService = {
  /**
   * Directly persists a validated event payload.
   * Useful for high-priority single event tracking.
   */
  trackEvent: async (payload: TrackEventPayload): Promise<AnalyticsEvent> => {
    const validated = AnalyticsValidator.validatePayload(payload);

    const event: AnalyticsEvent = {
      ...validated,
      id: uuidv4(),
      timestamp: validated.timestamp || new Date().toISOString(),
    };

    return await analyticsRepository.createEvent(event);
  },

  /**
   * Persists a batch of events efficiently.
   */
  trackBatch: async (payloads: TrackEventPayload[]): Promise<AnalyticsEvent[]> => {
    if (payloads.length === 0) return [];

    const validated = AnalyticsValidator.validateBatch(payloads);

    const events: AnalyticsEvent[] = validated.map((v) => ({
      ...v,
      id: uuidv4(),
      timestamp: v.timestamp || new Date().toISOString(),
    }));

    return await analyticsRepository.batchCreateEvents(events);
  },

  /**
   * Fetches events and provides basic aggregation capabilities.
   */
  getInvitationMetrics: async (invitationId: string) => {
    const events = await analyticsRepository.getEventsByInvitation(invitationId);

    return {
      totalEvents: AnalyticsAggregator.countEvents(events),
      uniqueSessions: AnalyticsAggregator.countSessions(events),
      uniqueGuests: AnalyticsAggregator.countUniqueGuests(events),
      eventsByType: AnalyticsAggregator.groupByEventType(events),
      eventsByDay: AnalyticsAggregator.groupByDay(events),
      averageInteractionDuration: AnalyticsAggregator.averageDuration(events),
      // Raw events returned in case further custom processing is needed by the caller
      raw: events,
    };
  },
};
