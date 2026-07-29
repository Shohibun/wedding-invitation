import { NotificationTemplateV2Schema } from "./schema";
import { CompiledTemplate } from "./types";
import { ValidationError } from "../errors";

export const TemplateValidator = {
  validateSchema(data: unknown): void {
    const result = NotificationTemplateV2Schema.safeParse(data);
    if (!result.success) {
      throw new ValidationError(`Invalid template schema: ${result.error.message}`);
    }
  },

  validateCompiled(
    compiled: CompiledTemplate,
    providedVariables: Record<string, string>
  ): string[] {
    const missing: string[] = [];
    compiled.requiredVariables.forEach((req: string) => {
      if (!providedVariables[req]) {
        missing.push(req);
      }
    });
    return missing;
  },
};
