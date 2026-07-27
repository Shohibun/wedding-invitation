import { createClient } from "../../lib/supabase/client";
import { Activity, CreateActivityDTO, ActivityRepositoryPort } from "./types";

export const ActivityMapper = {
  toDomain(row: Record<string, unknown>): Activity {
    return {
      id: row.id as string,
      invitationId: row.invitation_id as string,
      userId: (row.user_id as string | null) || null,
      action: row.action as Activity["action"],
      entityType: (row.entity_type as string | undefined) || undefined,
      entityId: (row.entity_id as string | undefined) || undefined,
      metadata:
        typeof row.metadata === "string"
          ? JSON.parse(row.metadata)
          : ((row.metadata || {}) as Record<string, unknown>),
      createdAt: row.created_at as string,
    };
  },

  toPersistence(dto: CreateActivityDTO): Record<string, unknown> {
    const payload: Record<string, unknown> = {
      invitation_id: dto.invitationId,
      action: dto.action,
    };

    if (dto.userId !== undefined) payload.user_id = dto.userId;
    if (dto.entityType !== undefined) payload.entity_type = dto.entityType;
    if (dto.entityId !== undefined) payload.entity_id = dto.entityId;
    if (dto.metadata !== undefined) payload.metadata = dto.metadata;

    return payload;
  },
};

class ActivityRepositoryImpl implements ActivityRepositoryPort {
  /**
   * Appends a new activity log to the database.
   */
  async logActivity(payload: CreateActivityDTO): Promise<Activity> {
    const supabase = createClient();

    const dbPayload = ActivityMapper.toPersistence(payload);

    const { data, error } = await supabase
      .from("invitation_activities")
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      throw new Error(`[ActivityRepository] Failed to log activity: ${error.message}`);
    }

    return ActivityMapper.toDomain(data);
  }

  /**
   * Fetches activities for an invitation, newest first.
   */
  async getActivitiesByInvitation(invitationId: string, limit: number = 50): Promise<Activity[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("invitation_activities")
      .select("*")
      .eq("invitation_id", invitationId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error(
        `[ActivityRepository] Failed to fetch activities for invitation ${invitationId}:`,
        error
      );
      return [];
    }

    return data.map(ActivityMapper.toDomain);
  }
}

export const activityRepository = new ActivityRepositoryImpl();
