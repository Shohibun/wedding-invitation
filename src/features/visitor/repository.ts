import { createClient } from "../../lib/supabase/client";
import { VisitorSession, VisitorRepositoryPort } from "./types";
import { VisitorMapper } from "./mapper";
import { TrackingRepositoryError } from "./errors";

class VisitorRepositoryImpl implements VisitorRepositoryPort {
  private readonly TABLE_NAME = "visitor_sessions";

  async createSession(session: VisitorSession): Promise<VisitorSession> {
    const supabase = createClient();
    const payload = VisitorMapper.toPersistence(session);

    const { data, error } = await supabase.from(this.TABLE_NAME).insert(payload).select().single();

    if (error) {
      throw new TrackingRepositoryError(
        `Failed to insert visitor session: ${error.message}`,
        error
      );
    }

    return VisitorMapper.toDomain(data);
  }

  async updateSession(session: VisitorSession): Promise<VisitorSession> {
    const supabase = createClient();
    const payload = VisitorMapper.toPersistence(session);

    // id should not be updated usually, but it is the primary key.
    const { id, ...updatePayload } = payload;

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new TrackingRepositoryError(
        `Failed to update visitor session ${id}: ${error.message}`,
        error
      );
    }

    return VisitorMapper.toDomain(data);
  }

  async closeSession(sessionId: string, endedAt: string, duration: number): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from(this.TABLE_NAME)
      .update({ ended_at: endedAt, duration })
      .eq("session_id", sessionId);

    if (error) {
      throw new TrackingRepositoryError(
        `Failed to close visitor session ${sessionId}: ${error.message}`,
        error
      );
    }
  }

  async getSession(sessionId: string): Promise<VisitorSession | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select("*")
      .eq("session_id", sessionId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Not found
      throw new TrackingRepositoryError(`Failed to fetch visitor session ${sessionId}`, error);
    }

    return VisitorMapper.toDomain(data);
  }

  async listSessions(limit: number = 1000): Promise<VisitorSession[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select("*")
      .order("started_at", { ascending: false })
      .limit(limit);

    if (error) {
      throw new TrackingRepositoryError(
        `Failed to fetch visitor sessions: ${error.message}`,
        error
      );
    }

    return data.map(VisitorMapper.toDomain);
  }

  async listInvitationSessions(
    invitationId: string,
    limit: number = 1000
  ): Promise<VisitorSession[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select("*")
      .eq("invitation_id", invitationId)
      .order("started_at", { ascending: false })
      .limit(limit);

    if (error) {
      throw new TrackingRepositoryError(
        `Failed to fetch sessions for invitation ${invitationId}`,
        error
      );
    }

    return data.map(VisitorMapper.toDomain);
  }

  async listGuestSessions(guestId: string, limit: number = 1000): Promise<VisitorSession[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select("*")
      .eq("guest_id", guestId)
      .order("started_at", { ascending: false })
      .limit(limit);

    if (error) {
      throw new TrackingRepositoryError(`Failed to fetch sessions for guest ${guestId}`, error);
    }

    return data.map(VisitorMapper.toDomain);
  }

  async deleteSession(sessionId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.from(this.TABLE_NAME).delete().eq("session_id", sessionId);

    if (error) {
      throw new TrackingRepositoryError(`Failed to delete session ${sessionId}`, error);
    }
  }
}

export const visitorRepository = new VisitorRepositoryImpl();
