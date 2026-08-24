import { z } from "zod";

export const TemplateCapabilitiesSchema = z.object({
  features: z.object({
    multiplePages: z.boolean().default(false),
    rtl: z.boolean().default(false),
    darkMode: z.boolean().default(true),
    animations: z.boolean().default(true),
    customFonts: z.boolean().default(true),
    customColors: z.boolean().default(true),
    guestManagement: z.boolean().default(true), // e.g. RSVP, wish
  }),
  // Which sections are natively supported by the template out of the box
  supportedSections: z.array(z.string()).default([]),
});

export type TemplateCapabilities = z.infer<typeof TemplateCapabilitiesSchema>;
