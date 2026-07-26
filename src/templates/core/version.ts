import { z } from "zod";

export const TemplateVersionSchema = z.object({
  major: z.number().int().min(1),
  minor: z.number().int().min(0),
  patch: z.number().int().min(0),
  label: z.string().optional(), // e.g., "beta", "rc"
});

export type TemplateVersion = z.infer<typeof TemplateVersionSchema>;

export function parseVersionString(versionStr: string): TemplateVersion {
  const parts = versionStr.split(".");
  if (parts.length < 3) {
    throw new Error(
      `Invalid version string format: ${versionStr}. Expected format: MAJOR.MINOR.PATCH[-label]`
    );
  }

  const major = parseInt(parts[0], 10);
  const minor = parseInt(parts[1], 10);

  const patchLabelParts = parts[2].split("-");
  const patch = parseInt(patchLabelParts[0], 10);
  const label = patchLabelParts.length > 1 ? patchLabelParts.slice(1).join("-") : undefined;

  return TemplateVersionSchema.parse({
    major,
    minor,
    patch,
    label,
  });
}

export function stringifyVersion(version: TemplateVersion): string {
  const base = `${version.major}.${version.minor}.${version.patch}`;
  return version.label ? `${base}-${version.label}` : base;
}
