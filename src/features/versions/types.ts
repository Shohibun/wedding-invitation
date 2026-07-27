import { z } from "zod";
import { VersionSchema, CreateVersionSchema, SnapshotSchema } from "./schema";

export type Version = z.infer<typeof VersionSchema>;
export type CreateVersionDTO = z.infer<typeof CreateVersionSchema>;
export type Snapshot = z.infer<typeof SnapshotSchema>;

export interface VersionRepositoryPort {
  createVersion(payload: CreateVersionDTO): Promise<Version>;
  getVersion(id: string): Promise<Version | null>;
  listVersions(invitationId: string): Promise<Version[]>;
}
