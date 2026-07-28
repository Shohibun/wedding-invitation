import { Trend, InsightRawData } from "./types";
import { InsightTrends } from "../../lib/insights/trends";
import { v4 as uuidv4 } from "uuid";

export const TrendEngine = {
  calculateTrends(rawData: InsightRawData): Trend[] {
    const trends: Trend[] = [];

    // Trend for Total Visitors
    const currentVisits = rawData.currentSessions.length;
    const previousVisits = rawData.previousSessions.length;
    const growth = InsightTrends.calculateGrowthPercentage(currentVisits, previousVisits);

    trends.push({
      id: uuidv4(),
      kpiId: "totalVisitors",
      currentValue: currentVisits,
      previousValue: previousVisits,
      growthPercentage: growth,
      direction: growth > 0 ? "up" : growth < 0 ? "down" : "flat",
      isFavorable: growth >= 0,
    });

    return trends;
  },
};
