import { z } from "zod";

export const giftSchema = z.object({
  invitation_id: z.string().uuid().optional(),
  bank_name: z.string().optional(),
  account_number: z.string().optional(),
  account_name: z.string().optional(),
  is_ewallet: z.boolean().optional(),
  qr_code_url: z.string().url().nullable().optional(),
});

export type GiftInsertDTO = z.infer<typeof giftSchema>;
