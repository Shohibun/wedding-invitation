import { z } from "zod";

export const rsvpSchema = z.object({
  invitation_id: z.string().uuid().optional(),
  guest_id: z.string().uuid().optional(),
  status: z.enum(["pending", "attending", "declined"]).optional(),
  attending_pax: z.number().int().min(1).nullable().optional(),
  dietary_requirements: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
});

export type RsvpInsertDTO = z.infer<typeof rsvpSchema>;
