import { z } from "zod";

export const SecuritySessionSchema = z.object({
  id: z.string().uuid(),
  sessionId: z.string(),
  userId: z.string().uuid(),
  deviceId: z.string(),
  browser: z.string(),
  operatingSystem: z.string(),
  platform: z.string(),
  ipAddress: z.string(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  current: z.boolean(),
  createdAt: z.string().datetime(),
  lastActivityAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
});

export const TrustedDeviceSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  deviceName: z.string(),
  browser: z.string(),
  operatingSystem: z.string(),
  platform: z.string(),
  trusted: z.boolean(),
  verified: z.boolean(),
  lastUsedAt: z.string().datetime(),
});

export const LoginHistorySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  loginAt: z.string().datetime(),
  logoutAt: z.string().datetime().nullable(),
  success: z.boolean(),
  ipAddress: z.string(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  browser: z.string(),
  operatingSystem: z.string(),
  platform: z.string(),
});

export const SecurityStatusSchema = z.object({
  userId: z.string().uuid(),
  passwordUpdatedAt: z.string().datetime(),
  emailVerified: z.boolean(),
  activeSessions: z.number().int().min(0),
  trustedDevices: z.number().int().min(0),
  securityScore: z.number().int().min(0).max(100),
  recommendations: z.array(z.string()),
});

export const SecurityEventSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.string(),
  severity: z.enum(["info", "warning", "critical"]),
  createdAt: z.string().datetime(),
  metadata: z.record(z.string(), z.any()),
});
