import { InsightRawData, InsightsRepositoryPort } from "./types";
import { dashboardRepository } from "../dashboard/repository";
import { INSIGHT_CONSTANTS } from "./constants";

class InsightsRepositoryImpl implements InsightsRepositoryPort {
  async getInsightData(
    invitationId: string,
    baselineDays: number = INSIGHT_CONSTANTS.DEFAULT_BASELINE_DAYS
  ): Promise<InsightRawData> {
    // Current period (e.g. last 7 days)
    const currentEnd = new Date();
    const currentStart = new Date();
    currentStart.setDate(currentStart.getDate() - baselineDays);

    // Previous period (e.g. 7 days before that)
    const previousEnd = new Date(currentStart);
    const previousStart = new Date(previousEnd);
    previousStart.setDate(previousStart.getDate() - baselineDays);

    // We reuse DashboardRepository to fetch exactly what we need
    const currentSessions = await dashboardRepository.getRawSessions({
      invitationId,
      startDate: currentStart.toISOString(),
      endDate: currentEnd.toISOString(),
    });

    const currentEvents = await dashboardRepository.getRawEvents({
      invitationId,
      startDate: currentStart.toISOString(),
      endDate: currentEnd.toISOString(),
    });

    const previousSessions = await dashboardRepository.getRawSessions({
      invitationId,
      startDate: previousStart.toISOString(),
      endDate: previousEnd.toISOString(),
    });

    const previousEvents = await dashboardRepository.getRawEvents({
      invitationId,
      startDate: previousStart.toISOString(),
      endDate: previousEnd.toISOString(),
    });

    return {
      currentSessions,
      currentEvents,
      previousSessions,
      previousEvents,
    };
  }
}

export const insightsRepository = new InsightsRepositoryImpl();
