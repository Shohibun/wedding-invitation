import { NotificationTemplateV2, CompiledTemplate } from "./types";
import { TemplateParser } from "./parser";
import { CompileError } from "./errors";

export const TemplateCompiler = {
  compile(template: NotificationTemplateV2): CompiledTemplate {
    try {
      const subjectParsed = template.subject
        ? TemplateParser.parse(template.subject)
        : { variables: [], ast: null };
      const bodyParsed = TemplateParser.parse(template.body);

      // Deduplicate all detected required variables from subject and body
      const allVariables = new Set([...subjectParsed.variables, ...bodyParsed.variables]);

      // Filter only those that are marked as required in the template's variable list
      const requiredVariables = Array.from(allVariables).filter((varKey) => {
        const def = template.variables.find((v) => v.key === varKey);
        return def ? def.required : false;
      });

      return {
        templateId: template.id,
        ast: {
          subjectAst: subjectParsed.ast,
          bodyAst: bodyParsed.ast,
        },
        requiredVariables,
        warnings: [],
      };
    } catch (err) {
      throw new CompileError(
        `Failed to compile template ${template.id}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  },
};
