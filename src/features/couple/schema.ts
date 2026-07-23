import { z } from "zod";

export const personSchema = z.object({
  invitation_id: z.string().uuid().optional(),
  role: z.enum(["groom", "bride"]).optional(),
  name: z.string().min(1).optional(),
  full_name: z.string().min(1).optional(),
  father_name: z.string().optional(),
  mother_name: z.string().optional(),
  description: z.string().nullable().optional(),
  instagram_username: z.string().nullable().optional(),
  photo_url: z.string().url().nullable().optional(),
});

export type PersonInput = z.infer<typeof personSchema>;
