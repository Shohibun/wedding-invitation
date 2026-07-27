import { z } from "zod";

/**
 * Defines the strict structure of the editable payload for validation before publishing.
 * This separates the Builder's internal state format from the database Draft schema.
 */
export const DraftSnapshotSchema = z.object({
  template: z.string().min(1, "Template ID is required"),
  theme: z.string().min(1, "Theme ID is required"),
  sections: z.array(z.string()).min(1, "At least one section must be enabled"),

  // These are optional or generic for now, but strictly typed as objects/arrays
  // to ensure defensive validation passes before business logic takes over.
  gallery: z.array(z.record(z.string(), z.unknown())).optional().default([]),
  guests: z.array(z.record(z.string(), z.unknown())).optional().default([]),
  events: z.array(z.record(z.string(), z.unknown())).optional().default([]),
  gifts: z.array(z.record(z.string(), z.unknown())).optional().default([]),

  // Allows any additional builder-specific config to pass through,
  // as long as it's a valid object
  config: z.record(z.string(), z.unknown()).optional().default({}),
});
