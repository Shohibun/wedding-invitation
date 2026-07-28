export const InsightForecast = {
  predictNextPeriodValue(current: number, previous: number): number {
    // Very simple linear extrapolation: next = current + (current - previous)
    const diff = current - previous;
    const next = current + diff;
    return Math.max(0, next); // Can't be negative visitors
  },
};
