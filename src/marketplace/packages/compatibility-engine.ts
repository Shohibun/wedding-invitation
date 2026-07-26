import { PackageManifest } from "./schema";
import { EngineVersionConflictError } from "./errors";
import { VersionResolver } from "./version-resolver";

export const CompatibilityEngine = {
  /**
   * Verifies if a package is compatible with the current running Engine Version.
   */
  verifyEngine: (manifest: PackageManifest, currentEngineVersion: string): void => {
    if (!VersionResolver.satisfies(currentEngineVersion, manifest.engineVersion)) {
      throw new EngineVersionConflictError(
        manifest.id,
        manifest.engineVersion,
        currentEngineVersion
      );
    }
  },

  /**
   * Verifies if a package is compatible with the currently active base template.
   */
  verifyTemplate: (manifest: PackageManifest, activeTemplateId?: string): void => {
    // If no specific template limitations, it's universally compatible.
    if (!manifest.compatibleTemplates || manifest.compatibleTemplates.length === 0) {
      return;
    }

    // If we are installing into a specific template context, check it.
    if (activeTemplateId && !manifest.compatibleTemplates.includes(activeTemplateId)) {
      throw new Error(`Package ${manifest.id} is not compatible with template ${activeTemplateId}`);
    }
  },
};
