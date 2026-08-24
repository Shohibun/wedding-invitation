import { z } from "zod";

export const wishSchema = z.object({
  invitation_id: z.string().uuid().optional(),
  guest_id: z.string().uuid().nullable().optional(),
  guest_name: z.string().min(1).optional(),
  message: z.string().min(1).optional(),
  status: z.enum(["pending", "approved", "spam"]).optional(),
});

export type WishInsertDTO = z.infer<typeof wishSchema>;
