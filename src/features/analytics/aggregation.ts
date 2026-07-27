import { AnalyticsEvent, AnalyticsEventType } from "./types";
import { AnalyticsAggregationError } from "./errors";

export const AnalyticsAggregator = {
  /**
   * Counts the total number of events.
   */
  countEvents(events: AnalyticsEvent[]): number {
    return events.length;
  },

  /**
   * Counts the number of unique guests across the events.
   * Excludes null guestIds (anonymous viewers).
   */
  countUniqueGuests(events: AnalyticsEvent[]): number {
    const uniqueGuests = new Set<string>();
    for (const event of events) {
      if (event.guestId) {
        uniqueGuests.add(event.guestId);
      }
    }
    return uniqueGuests.size;
  },

  /**
   * Counts the number of unique sessions across the events.
   */
  countSessions(events: AnalyticsEvent[]): number {
    const uniqueSessions = new Set<string>();
    for (const event of events) {
      uniqueSessions.add(event.sessionId);
    }
    return uniqueSessions.size;
  },

  /**
   * Calculates the average duration across all events that have a duration.
   * Returns 0 if no events have duration.
   */
  averageDuration(events: AnalyticsEvent[]): number {
    let totalDuration = 0;
    let count = 0;

    for (const event of events) {
      if (event.duration !== undefined) {
        totalDuration += event.duration;
        count++;
      }
    }

    return count > 0 ? totalDuration / count : 0;
  },

  /**
   * Groups events by their event type.
   */
  groupByEventType(events: AnalyticsEvent[]): Record<AnalyticsEventType, AnalyticsEvent[]> {
    const grouped = {} as Record<AnalyticsEventType, AnalyticsEvent[]>;

    for (const event of events) {
      if (!grouped[event.eventType as AnalyticsEventType]) {
        grouped[event.eventType as AnalyticsEventType] = [];
      }
      grouped[event.eventType as AnalyticsEventType].push(event);
    }

    return grouped;
  },

  /**
   * Groups events by the day they occurred (YYYY-MM-DD string).
   */
  groupByDay(events: AnalyticsEvent[]): Record<string, AnalyticsEvent[]> {
    const grouped: Record<string, AnalyticsEvent[]> = {};

    for (const event of events) {
      try {
        // Simple extraction of YYYY-MM-DD from ISO string
        const day = event.timestamp.split("T")[0];
        if (!day) throw new Error("Invalid timestamp format");

        if (!grouped[day]) grouped[day] = [];
        grouped[day].push(event);
      } catch (_e) {
        throw new AnalyticsAggregationError(
          `Failed to group event by day due to invalid timestamp: ${event.timestamp}`
        );
      }
    }

    return grouped;
  },
};
