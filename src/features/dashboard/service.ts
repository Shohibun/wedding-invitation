import { DashboardFilter, DashboardSummary, DashboardRawData } from "./types";
import { dashboardRepository } from "./repository";
import { DashboardBuilder } from "../../lib/dashboard/dashboard-builder";

export const DashboardService = {
  async getSummary(filter: DashboardFilter): Promise<DashboardSummary> {
    // 1. Fetch Current Period
    const currentSessions = await dashboardRepository.getRawSessions(filter);
    const currentEvents = await dashboardRepository.getRawEvents(filter);

    // 2. Fetch Previous Period (for trends)
    // To do this accurately, we calculate the duration of the current filter and subtract it.
    const start = new Date(filter.startDate).getTime();
    const end = new Date(filter.endDate).getTime();
    const durationMs = end - start;

    const previousFilter: DashboardFilter = {
      ...filter,
      startDate: new Date(start - durationMs).toISOString(),
      endDate: new Date(end - durationMs).toISOString(),
    };

    const previousSessions = await dashboardRepository.getRawSessions(previousFilter);
    const previousEvents = await dashboardRepository.getRawEvents(previousFilter);

    const currentData: DashboardRawData = { sessions: currentSessions, events: currentEvents };
    const previousData: DashboardRawData = { sessions: previousSessions, events: previousEvents };

    // 3. Build Summary
    return DashboardBuilder.buildSummary(currentData, previousData);
  },
};
