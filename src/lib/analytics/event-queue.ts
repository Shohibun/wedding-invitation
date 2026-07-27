import { TrackEventPayload } from "../../features/analytics/types";

/**
 * An in-memory queue to temporarily buffer events before they are batched and persisted.
 * This decoupled design allows the UI to fire rapidly without awaiting database writes.
 */
export class AnalyticsEventQueue {
  private queue: TrackEventPayload[] = [];

  enqueue(event: TrackEventPayload): void {
    this.queue.push(event);
  }

  flush(): TrackEventPayload[] {
    const events = [...this.queue];
    this.clear();
    return events;
  }

  clear(): void {
    this.queue = [];
  }

  size(): number {
    return this.queue.length;
  }

  peek(): TrackEventPayload[] {
    return [...this.queue];
  }
}
