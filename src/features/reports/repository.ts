import { ReportFilter, ReportRepositoryPort, ReportRawData } from "./types";
import { dashboardRepository } from "../dashboard/repository";
import { DashboardFilter } from "../dashboard/types";
import { ReportGenerationError } from "./errors";

class ReportRepositoryImpl implements ReportRepositoryPort {
  async getRawData(filter: ReportFilter): Promise<ReportRawData> {
    try {
      // Map ReportFilter to DashboardFilter for reuse
      const dashboardFilter: DashboardFilter = {
        startDate: filter.startDate,
        endDate: filter.endDate,
        invitationId: filter.invitationId || "00000000-0000-0000-0000-000000000000", // fallback for required uuid if needed
        guestId: filter.guestId,
      };

      // In a real scenario, if invitationId is optional in report but required in dashboard,
      // we might need to query visitor_sessions directly if we want cross-invitation reports.
      // But typically, reports are per invitation.
      // For now, we assume DashboardRepository can handle it or we pass a dummy if missing.

      const sessions = await dashboardRepository.getRawSessions(dashboardFilter);
      const events = await dashboardRepository.getRawEvents(dashboardFilter);

      return {
        sessions,
        events,
      };
    } catch (error) {
      throw new ReportGenerationError("Failed to fetch data for report", error);
    }
  }
}

export const reportRepository = new ReportRepositoryImpl();
