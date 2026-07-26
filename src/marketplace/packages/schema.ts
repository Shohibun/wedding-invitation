import { z } from "zod";

export const PackageManifestSchema = z.object({
  id: z.string(),
  version: z.string(),
  manifestVersion: z.number(),
  engineVersion: z.string(),
  dependencies: z.record(z.string(), z.string()).default({}),
  compatibleTemplates: z.array(z.string()).optional(),
  capabilities: z.array(z.string()).default([]),
  license: z.string().optional(),
  author: z.string().optional(),
});

export type PackageManifest = z.infer<typeof PackageManifestSchema>;
