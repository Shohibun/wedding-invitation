import { z } from "zod";

export const guestSchema = z.object({
  invitation_id: z.string().uuid().optional(),
  name: z.string().min(1).optional(),
  phone_number: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(["pending", "attending", "declined"]).optional(),
  pax: z.number().int().min(1).optional(),
});

export type GuestInput = z.infer<typeof guestSchema>;
