import { AnalyticsService } from "../../features/analytics/service";

import { AnalyticsEventQueue } from "./event-queue";
import { AnalyticsDispatchError } from "../../features/analytics/errors";

export class EventBatcher {
  private queue: AnalyticsEventQueue;
  private isProcessing: boolean = false;

  constructor(queue: AnalyticsEventQueue) {
    this.queue = queue;
  }

  /**
   * Flushes the entire queue and sends it to the Service Layer for batch persistence.
   * Silently catches errors to prevent crashing the UI thread.
   */
  async processBatch(): Promise<void> {
    if (this.isProcessing) return;
    if (this.queue.size() === 0) return;

    this.isProcessing = true;
    const events = this.queue.flush();

    try {
      await AnalyticsService.trackBatch(events);
    } catch (_error) {
      console.error(new AnalyticsDispatchError("Batch processing failed. Events lost."));
      // In a production environment with critical analytics, we might re-enqueue failed events here,
      // but for this implementation we simply drop them to prevent memory bloat during permanent outages.
    } finally {
      this.isProcessing = false;
    }
  }
}
