import { Draft } from "./types";

export const DraftMapper = {
  /**
   * Maps a Supabase 'invitations' row (which contains draft fields) to a Draft entity.
   */
  toDomain(row: Record<string, unknown>): Draft {
    return {
      id: row.id as string, // We use the invitation ID as the primary key for the draft conceptually
      invitationId: row.id as string,
      version: (row.draft_version as number) || 1,
      status: (row.draft_status as Draft["status"]) || "draft",
      data:
        typeof row.draft_data === "string"
          ? JSON.parse(row.draft_data)
          : ((row.draft_data || {}) as Record<string, unknown>),
      updatedAt: (row.draft_updated_at as string) || (row.updated_at as string),
      updatedBy: (row.draft_updated_by as string | null) || null,
    };
  },

  /**
   * Maps a Draft entity update to a Supabase 'invitations' row update payload.
   */
  toPersistence(dto: Partial<Draft>): Record<string, unknown> {
    const payload: Record<string, unknown> = {};

    if (dto.data !== undefined) payload.draft_data = dto.data;
    if (dto.status !== undefined) payload.draft_status = dto.status;
    if (dto.version !== undefined) payload.draft_version = dto.version;
    if (dto.updatedBy !== undefined) payload.draft_updated_by = dto.updatedBy;

    return payload;
  },
};
