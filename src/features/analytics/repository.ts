import { createClient } from "../../lib/supabase/client";
import { AnalyticsEvent, AnalyticsRepositoryPort } from "./types";
import { AnalyticsMapper } from "./mapper";
import { AnalyticsRepositoryError } from "./errors";

class AnalyticsRepositoryImpl implements AnalyticsRepositoryPort {
  private readonly TABLE_NAME = "analytics_events";

  async createEvent(event: AnalyticsEvent): Promise<AnalyticsEvent> {
    const supabase = createClient();
    const payload = AnalyticsMapper.toPersistence(event);

    const { data, error } = await supabase.from(this.TABLE_NAME).insert(payload).select().single();

    if (error) {
      throw new AnalyticsRepositoryError(
        `Failed to insert analytics event: ${error.message}`,
        error
      );
    }

    return AnalyticsMapper.toDomain(data);
  }

  async batchCreateEvents(events: AnalyticsEvent[]): Promise<AnalyticsEvent[]> {
    if (events.length === 0) return [];

    const supabase = createClient();
    const payloads = events.map(AnalyticsMapper.toPersistence);

    const { data, error } = await supabase.from(this.TABLE_NAME).insert(payloads).select();

    if (error) {
      throw new AnalyticsRepositoryError(
        `Failed to batch insert analytics events: ${error.message}`,
        error
      );
    }

    return data.map(AnalyticsMapper.toDomain);
  }

  async getEventById(id: string): Promise<AnalyticsEvent | null> {
    const supabase = createClient();

    const { data, error } = await supabase.from(this.TABLE_NAME).select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") return null; // Not found
      throw new AnalyticsRepositoryError(`Failed to fetch analytics event ${id}`, error);
    }

    return AnalyticsMapper.toDomain(data);
  }

  async getEventsByInvitation(
    invitationId: string,
    limit: number = 1000
  ): Promise<AnalyticsEvent[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select("*")
      .eq("invitation_id", invitationId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      throw new AnalyticsRepositoryError(
        `Failed to fetch events for invitation ${invitationId}`,
        error
      );
    }

    return data.map(AnalyticsMapper.toDomain);
  }

  async getEventsBySession(sessionId: string): Promise<AnalyticsEvent[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (error) {
      throw new AnalyticsRepositoryError(`Failed to fetch events for session ${sessionId}`, error);
    }

    return data.map(AnalyticsMapper.toDomain);
  }

  async getEventsByGuest(guestId: string): Promise<AnalyticsEvent[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select("*")
      .eq("guest_id", guestId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new AnalyticsRepositoryError(`Failed to fetch events for guest ${guestId}`, error);
    }

    return data.map(AnalyticsMapper.toDomain);
  }

  async deleteEvent(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.from(this.TABLE_NAME).delete().eq("id", id);

    if (error) {
      throw new AnalyticsRepositoryError(`Failed to delete event ${id}`, error);
    }
  }
}

export const analyticsRepository = new AnalyticsRepositoryImpl();
