import { z } from "zod";

const guestCategorySchema = z.enum([
  "family",
  "friend",
  "coworker",
  "vip",
  "vendor",
  "general",
] as const);

export const createGuestSchema = z.object({
  invitation_id: z.string().uuid(),
  name: z.string().min(2, "Name must be at least 2 characters").max(150),
  phone_number: z.string().max(20).nullable().optional(),
  category: guestCategorySchema.default("general"),
  guest_status: z.enum(["active", "inactive", "blocked"]).default("active"),
  rsvp_status: z.enum(["pending", "accepted", "declined", "maybe"]).default("pending"),
  attendance_status: z
    .enum(["not_checked_in", "checked_in", "checked_out"])
    .default("not_checked_in"),
  pax: z.number().int().min(1).default(1),
});

export const updateGuestSchema = createGuestSchema.partial().omit({ invitation_id: true });

export const importGuestSchema = z.object({
  name: z.string().min(2).max(150),
  phone_number: z.string().max(20).optional(),
  category: guestCategorySchema.optional(),
  pax: z.number().int().min(1).optional(),
});

export const bulkGuestSchema = z.array(importGuestSchema);

export const searchGuestSchema = z.object({
  query: z.string().optional(),
  invitation_id: z.string().uuid(),
  filter: z
    .object({
      category: guestCategorySchema.optional(),
      guest_status: z.enum(["active", "inactive", "blocked"]).optional(),
      rsvp_status: z.enum(["pending", "accepted", "declined", "maybe"]).optional(),
      attendance_status: z.enum(["not_checked_in", "checked_in", "checked_out"]).optional(),
    })
    .optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  sortBy: z.enum(["name", "created_at", "updated_at"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});
