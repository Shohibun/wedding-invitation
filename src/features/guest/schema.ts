import { z } from "zod";

export const createGuestSchema = z.object({
  invitation_id: z.string().uuid(),
  name: z.string().min(2, "Name must be at least 2 characters").max(150),
  phone_number: z.string().max(30).nullable().optional(),
  slug: z.string().max(255),
  max_pax: z.number().int().min(1).default(1),
});

export const updateGuestSchema = createGuestSchema.partial().omit({ invitation_id: true });

export const importGuestSchema = z.object({
  name: z.string().min(2).max(150),
  phone_number: z.string().max(30).optional(),
  slug: z.string().max(255).optional(),
  max_pax: z.number().int().min(1).optional(),
});

export const bulkGuestSchema = z.array(importGuestSchema);

export const searchGuestSchema = z.object({
  query: z.string().optional(),
  invitation_id: z.string().uuid(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  sortBy: z.enum(["name", "created_at", "updated_at"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type GuestInsertDTO = z.infer<typeof createGuestSchema>;
export type GuestUpdateDTO = z.infer<typeof updateGuestSchema>;
export type GuestImport = z.infer<typeof importGuestSchema>;
