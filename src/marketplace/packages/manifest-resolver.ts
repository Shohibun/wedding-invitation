import { PackageManifest, PackageManifestSchema } from "./schema";
import { ManifestValidationError } from "./errors";

export const ManifestResolver = {
  /**
   * Resolves and strictly validates a raw package manifest payload.
   */
  resolve: (rawData: unknown): PackageManifest => {
    const result = PackageManifestSchema.safeParse(rawData);

    if (!result.success) {
      // We can extract an ID if it partially matches, or fallback to 'unknown'
      const id = (rawData as Record<string, unknown>)?.id || "unknown";
      throw new ManifestValidationError(id as string, result.error.issues);
    }

    return result.data;
  },
};
