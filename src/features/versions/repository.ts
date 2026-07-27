import { createClient } from "../../lib/supabase/client";
import { Version, CreateVersionDTO, VersionRepositoryPort } from "./types";

export const VersionMapper = {
  toDomain(row: Record<string, unknown>): Version {
    return {
      id: row.id as string,
      invitationId: row.invitation_id as string,
      versionNumber: row.version_number as number,
      publishedAt: row.published_at as string,
      publishedBy: (row.published_by as string | null) || null,
      message: (row.message as string | undefined) || undefined,
      snapshot:
        typeof row.snapshot === "string"
          ? JSON.parse(row.snapshot)
          : ((row.snapshot || {}) as Record<string, unknown>),
      createdAt: row.created_at as string,
    };
  },
};

class VersionRepositoryImpl implements VersionRepositoryPort {
  /**
   * Creates a new immutable version snapshot in the database.
   * Note: The repository design explicitly lacks an 'updateVersion' method.
   */
  async createVersion(payload: CreateVersionDTO): Promise<Version> {
    const supabase = createClient();

    const dbPayload = {
      invitation_id: payload.invitationId,
      version_number: payload.versionNumber,
      message: payload.message,
      snapshot: payload.snapshot,
      published_by: payload.publishedBy,
    };

    const { data, error } = await supabase
      .from("invitation_versions")
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      throw new Error(`[VersionRepository] Failed to create version: ${error.message}`);
    }

    return VersionMapper.toDomain(data);
  }

  /**
   * Fetches a specific version by its unique ID.
   */
  async getVersion(id: string): Promise<Version | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("invitation_versions")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return null;
    }

    return VersionMapper.toDomain(data);
  }

  /**
   * Lists all historical versions for a given invitation, ordered from newest to oldest.
   */
  async listVersions(invitationId: string): Promise<Version[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("invitation_versions")
      .select("*")
      .eq("invitation_id", invitationId)
      .order("published_at", { ascending: false });

    if (error) {
      console.error(
        `[VersionRepository] Failed to list versions for invitation ${invitationId}:`,
        error
      );
      return [];
    }

    return data.map(VersionMapper.toDomain);
  }
}

export const versionRepository = new VersionRepositoryImpl();
