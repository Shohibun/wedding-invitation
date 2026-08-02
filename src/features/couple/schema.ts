import { z } from "zod";

export const coupleSchema = z.object({
  invitation_id: z.string().uuid().optional(),
  role: z.enum(["groom", "bride"]).optional(),
  name: z.string().min(1).optional(),
  full_name: z.string().min(1).optional(),
  father_name: z.string().nullable().optional(),
  mother_name: z.string().nullable().optional(),
  instagram: z.string().max(100).nullable().optional(),
  photo_url: z.string().url().nullable().optional(),
});

export type CoupleInsertDTO = z.infer<typeof coupleSchema>;
