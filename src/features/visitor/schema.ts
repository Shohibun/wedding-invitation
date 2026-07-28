import { z } from "zod";

export const DeviceInfoSchema = z.object({
  device: z.string().optional(),
  browser: z.string().optional(),
  os: z.string().optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
});

export const ViewportSchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const VisitorSessionSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  guestId: z.string().uuid().nullable().optional(),
  sessionId: z.string().uuid(),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().optional(),
  duration: z.number().int().nonnegative().optional(),
  device: z.string().optional(),
  browser: z.string().optional(),
  os: z.string().optional(),
  viewportWidth: z.number().int().positive().optional(),
  viewportHeight: z.number().int().positive().optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
  referrer: z.string().optional(),
  entryPath: z.string().optional(),
  exitPath: z.string().optional(),
  visitCount: z.number().int().nonnegative().default(1),
  isReturning: z.boolean().default(false),
  ipHash: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const TrackingEventSchema = z.object({
  eventType: z.string(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});

export const ScrollMetricsSchema = z.object({
  currentScroll: z.number().nonnegative(),
  maxScroll: z.number().nonnegative(),
  scrollPercentage: z.number().min(0).max(100),
  reachedBottom: z.boolean(),
  firstScrollTimestamp: z.string().datetime().optional(),
  lastScrollTimestamp: z.string().datetime().optional(),
});
