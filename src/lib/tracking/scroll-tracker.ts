import { ScrollMetrics } from "../../features/visitor/types";
import { TrackingLogic } from "../../features/visitor/tracking";

export class ScrollTracker {
  private maxScroll: number = 0;
  private firstScrollAt: string | undefined;
  private lastScrollAt: string | undefined;
  private reportedMilestones = new Set<number>();
  private readonly milestones = [25, 50, 75, 100];

  constructor(private onMilestone: (metrics: ScrollMetrics, milestone: number) => void) {}

  public handleScroll(): void {
    if (typeof window === "undefined") return;

    const currentScroll = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (currentScroll > this.maxScroll) {
      this.maxScroll = currentScroll;
    }

    const now = new Date().toISOString();
    if (!this.firstScrollAt) {
      this.firstScrollAt = now;
    }
    this.lastScrollAt = now;

    const percentage = TrackingLogic.calculateScrollPercentage(this.maxScroll, documentHeight);

    // Check milestones
    for (const milestone of this.milestones) {
      if (
        TrackingLogic.hasReachedMilestone(percentage, milestone) &&
        !this.reportedMilestones.has(milestone)
      ) {
        this.reportedMilestones.add(milestone);
        this.onMilestone(this.getMetrics(currentScroll, percentage), milestone);
      }
    }
  }

  public getMetrics(currentScroll: number, percentage: number): ScrollMetrics {
    return {
      currentScroll,
      maxScroll: this.maxScroll,
      scrollPercentage: percentage,
      reachedBottom: percentage >= 99,
      firstScrollTimestamp: this.firstScrollAt,
      lastScrollTimestamp: this.lastScrollAt,
    };
  }
}
