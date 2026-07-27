import { VersionService } from "../versions/service";
import { comparator } from "./comparator";
import { DiffResult } from "./types";
import { ActivityService } from "../activity/service";

export const CompareService = {
  /**
   * Fetches two historical versions and returns their deeply computed differences.
   */
  compareVersions: async (versionAId: string, versionBId: string): Promise<DiffResult> => {
    const versionA = await VersionService.readVersion(versionAId);
    const versionB = await VersionService.readVersion(versionBId);

    if (!versionA || !versionB) {
      throw new Error(
        `[CompareService] Cannot compare: One or both versions not found (${versionAId}, ${versionBId})`
      );
    }

    return comparator.compareVersions(versionA, versionB);
  },

  /**
   * Safely restores a historical version by injecting its snapshot into the active Draft.
   * Does NOT overwrite history. The restored draft will become a NEW version upon publish.
   */
  restore: async (versionId: string, restoredByUserId?: string): Promise<void> => {
    // 1. Let the Version Engine inject the snapshot back into the mutable draft data.
    await VersionService.restoreVersion(versionId);

    // 2. Log this action into the permanent audit trail.
    const version = await VersionService.readVersion(versionId);

    if (version) {
      await ActivityService.log({
        invitationId: version.invitationId,
        userId: restoredByUserId || null,
        action: "version_restored",
        entityType: "version",
        entityId: versionId,
        metadata: {
          restored_from_version_number: version.versionNumber,
          message: `Restored to version ${version.versionNumber}`,
        },
      });
    }
  },
};
