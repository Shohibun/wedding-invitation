import { TemplateParser as NewTemplateParser } from "../../features/notifications/templates/parser";
import { TemplateError } from "../../features/notifications/errors";

/**
 * @deprecated Use TemplateParser from `features/notifications/templates/parser.ts` instead.
 */
export const TemplateParser = {
  parseVariables(template: string): string[] {
    if (!template) return [];
    return NewTemplateParser.parse(template).variables;
  },

  validate(template: string): void {
    if (!template || template.trim() === "") {
      throw new TemplateError("Template body cannot be empty");
    }
  },
};
