import { VariantManifestSchema } from "./manifest";

export function validateVariantManifest(manifest: unknown) {
  return VariantManifestSchema.parse(manifest);
}

// In the future we can add more runtime checks here to ensure the variant package is complete
