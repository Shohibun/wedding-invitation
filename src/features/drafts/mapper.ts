import { Draft } from "./types";

export const DraftMapper = {
  toDomain(row: Record<string, unknown>): Draft {
    return {
      invitation_id: row.invitation_id as string,
      payload:
        typeof row.payload === "string"
          ? JSON.parse(row.payload)
          : ((row.payload || {}) as Record<string, unknown>),
      created_at: row.created_at as string,
      updated_at: row.updated_at as string,
    };
  },

  toPersistence(domain: Record<string, unknown>): Record<string, unknown> {
    return {
      payload: domain.payload || domain,
    };
  },
};
