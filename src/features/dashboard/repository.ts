import { DashboardFilter, DashboardRepositoryPort } from "./types";
import { VisitorSession } from "../visitor/types";
import { AnalyticsEvent } from "../analytics/types";
import { createClient } from "../../lib/supabase/client";
import { VisitorMapper } from "../visitor/mapper";
import { AnalyticsMapper } from "../analytics/mapper";
import { DashboardRepositoryError } from "./errors";

class DashboardRepositoryImpl implements DashboardRepositoryPort {
  async getRawSessions(filter: DashboardFilter): Promise<VisitorSession[]> {
    const supabase = createClient();
    let query = supabase
      .from("visitor_sessions")
      .select("*")
      .eq("invitation_id", filter.invitationId)
      .gte("started_at", filter.startDate)
      .lte("started_at", filter.endDate);

    if (filter.guestId) {
      query = query.eq("guest_id", filter.guestId);
    }

    const { data, error } = await query;

    if (error) {
      throw new DashboardRepositoryError("Failed to fetch sessions for dashboard", error);
    }
    return data.map(VisitorMapper.toDomain);
  }

  async getRawEvents(filter: DashboardFilter): Promise<AnalyticsEvent[]> {
    const supabase = createClient();
    let query = supabase
      .from("analytics_events")
      .select("*")
      .eq("invitation_id", filter.invitationId)
      .gte("created_at", filter.startDate)
      .lte("created_at", filter.endDate);

    if (filter.guestId) {
      query = query.eq("guest_id", filter.guestId);
    }

    const { data, error } = await query;

    if (error) {
      throw new DashboardRepositoryError("Failed to fetch events for dashboard", error);
    }

    return data.map(AnalyticsMapper.toDomain);
  }
}

export const dashboardRepository = new DashboardRepositoryImpl();
