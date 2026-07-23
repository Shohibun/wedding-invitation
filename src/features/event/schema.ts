import { z } from "zod";

export const weddingeventSchema = z.object({
  invitation_id: z.string().uuid().optional(),
  title: z.string().min(1).optional(),
  date: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().nullable().optional(),
  timezone: z.string().optional(),
  location_name: z.string().optional(),
  address: z.string().optional(),
  google_maps_url: z.string().url().nullable().optional(),
  is_main_event: z.boolean().optional(),
});

export type WeddingEventInput = z.infer<typeof weddingeventSchema>;
