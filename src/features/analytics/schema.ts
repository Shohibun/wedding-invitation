import { z } from "zod";
import { EventTypeValues } from "./analytics-events";

// Base metadata schema, flexible but explicitly record string to unknown
export const AnalyticsMetadataSchema = z.record(z.string(), z.unknown());

export const AnalyticsEventSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  guestId: z.string().uuid().nullable().optional(),
  sessionId: z.string().uuid(),
  eventType: z.enum(EventTypeValues),
  metadata: AnalyticsMetadataSchema.default({}),

  // Environment context
  device: z.string().optional(),
  browser: z.string().optional(),
  os: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  referrer: z.string().optional(),
  path: z.string().optional(),
  duration: z.number().int().nonnegative().optional(),

  // Extended context
  ipHash: z.string().optional(),
  userAgent: z.string().optional(),
  viewportWidth: z.number().int().positive().optional(),
  viewportHeight: z.number().int().positive().optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),

  // Timestamp
  timestamp: z.string().datetime(), // Enforce ISO strings
});

// Payload for tracking a new event (id and timestamp handled centrally)
export const TrackEventPayloadSchema = AnalyticsEventSchema.omit({
  id: true,
  timestamp: true,
}).extend({
  // Allow timestamp override, but default will be injected
  timestamp: z.string().datetime().optional(),
});
