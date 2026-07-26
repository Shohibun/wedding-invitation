export * from "./manifest";

import { PresetPackageSchema } from "./manifest";

export function validatePresetPackage(payload: unknown) {
  return PresetPackageSchema.parse(payload);
}
