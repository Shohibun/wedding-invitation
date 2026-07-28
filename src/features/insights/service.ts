import { InsightSummary } from "./types";
import { InsightError } from "./errors";
import { insightsRepository } from "./repository";
import { InsightBuilder } from "./insight-builder";
import { INSIGHT_CONSTANTS } from "./constants";

export const InsightsService = {
  async generateInsights(
    invitationId: string,
    baselineDays: number = INSIGHT_CONSTANTS.DEFAULT_BASELINE_DAYS
  ): Promise<InsightSummary> {
    try {
      const rawData = await insightsRepository.getInsightData(invitationId, baselineDays);
      return InsightBuilder.build(rawData);
    } catch (error) {
      throw new InsightError(
        `Failed to generate insights: ${error instanceof Error ? error.message : "Unknown error"}`,
        "SERVICE_ERROR"
      );
    }
  },
};
