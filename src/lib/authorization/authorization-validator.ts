import { z } from "zod";

export const AuthorizationValidator = {
  validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new Error(`Authorization Validation failed: ${result.error.message}`);
    }
    return result.data;
  },
};
