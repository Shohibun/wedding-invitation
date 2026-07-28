// Domain logic for Tracking specific concerns

export const TrackingLogic = {
  calculateScrollPercentage(currentScroll: number, maxScroll: number): number {
    if (maxScroll <= 0) return 0;
    return Math.min(100, Math.max(0, Math.round((currentScroll / maxScroll) * 100)));
  },

  hasReachedMilestone(percentage: number, milestone: number): boolean {
    return percentage >= milestone;
  },
};
