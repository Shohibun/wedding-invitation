import { z } from "zod";

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  fullName: z.string().min(1, "Full name is required").max(100),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email(),
  phone: z.string().max(20).nullable(),
  avatar: z.string().url().nullable(),
  bio: z.string().max(500).nullable(),
  language: z.string(),
  timezone: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const UserPreferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: z.string(),
  timezone: z.string(),
  dateFormat: z.string(),
  timeFormat: z.enum(["12h", "24h"]),
});

export const UserDeviceSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string(),
  browser: z.string(),
  os: z.string(),
  platform: z.enum(["desktop", "mobile", "tablet", "unknown"]),
  ipAddress: z.string(),
  location: z.string().nullable(),
  current: z.boolean(),
  lastActiveAt: z.string().datetime(),
});

export const UserSessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  deviceId: z.string().uuid(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  lastActivityAt: z.string().datetime(),
  current: z.boolean(),
});

export const UpdateProfileDTOSchema = z.object({
  fullName: z.string().min(1).max(100).optional(),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/)
    .optional(),
  phone: z.string().max(20).nullable().optional(),
  bio: z.string().max(500).nullable().optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
});
