import { VisitorSessionSchema } from "./schema";
import { VisitorSession } from "./types";
import { VisitorValidationError } from "./errors";

export const VisitorValidator = {
  validateSession(payload: unknown): VisitorSession {
    const result = VisitorSessionSchema.safeParse(payload);

    if (!result.success) {
      throw new VisitorValidationError(
        "Invalid visitor session payload",
        result.error.flatten().fieldErrors
      );
    }

    return result.data;
  },
};
