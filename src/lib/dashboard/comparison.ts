export const Comparison = {
  calculateTrend(
    currentValue: number,
    previousValue: number
  ): { trend: number; direction: "up" | "down" | "neutral" } {
    if (previousValue === 0) {
      return { trend: currentValue > 0 ? 100 : 0, direction: currentValue > 0 ? "up" : "neutral" };
    }

    const trend = Math.round(((currentValue - previousValue) / previousValue) * 100);
    let direction: "up" | "down" | "neutral" = "neutral";

    if (trend > 0) direction = "up";
    if (trend < 0) direction = "down";

    return { trend: Math.abs(trend), direction };
  },
};
