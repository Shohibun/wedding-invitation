import { AnalyticsEventQueue } from "./event-queue";
import { EventBatcher } from "./event-batcher";
import { EventNormalizer } from "./event-normalizer";
import { TrackEventPayload } from "../../features/analytics/types";
import { AnalyticsService } from "../../features/analytics/service";

export interface DispatcherOptions {
  batchSize?: number;
}

export class AnalyticsDispatcher {
  private queue: AnalyticsEventQueue;
  private batcher: EventBatcher;
  private batchSize: number;

  constructor(options: DispatcherOptions = {}) {
    this.queue = new AnalyticsEventQueue();
    this.batcher = new EventBatcher(this.queue);
    this.batchSize = options.batchSize || 10;
  }

  /**
   * Pushes a normalized event onto the in-memory queue.
   * Automatically triggers a batch flush if the queue reaches the defined batchSize.
   */
  public enqueue(payload: Partial<TrackEventPayload>): void {
    const normalizedEvent = EventNormalizer.normalize(payload);
    this.queue.enqueue(normalizedEvent);

    if (this.queue.size() >= this.batchSize) {
      // Fire and forget (don't await) so we don't block the caller
      this.batcher.processBatch();
    }
  }

  /**
   * Instantly bypasses the queue to write a critical event immediately.
   */
  public async trackImmediate(payload: Partial<TrackEventPayload>): Promise<void> {
    const normalizedEvent = EventNormalizer.normalize(payload);
    await AnalyticsService.trackEvent(normalizedEvent);
  }

  /**
   * Flushes any remaining items in the queue (e.g. useful during page unload).
   */
  public async flush(): Promise<void> {
    await this.batcher.processBatch();
  }

  public getQueueSize(): number {
    return this.queue.size();
  }
}
