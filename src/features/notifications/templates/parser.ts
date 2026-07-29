import { VariableEngine } from "../../../lib/notifications/templates/variable-engine";
import { TemplateSyntaxError } from "./errors";

export const TemplateParser = {
  parse(content: string): { variables: string[]; ast: Record<string, unknown> } {
    try {
      const extracted = VariableEngine.extractVariables(content);
      // Basic mock AST for now. In a full implementation, we might build a real syntax tree for conditions.
      const ast = {
        type: "root",
        children: [{ type: "text", content }],
      };

      return { variables: extracted, ast };
    } catch (err) {
      throw new TemplateSyntaxError(
        `Failed to parse template: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  },
};
