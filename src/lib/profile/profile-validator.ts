import { z } from "zod";

export const ProfileValidator = {
  validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new Error(`Profile Validation failed: ${result.error.message}`);
    }
    return result.data;
  },
};
