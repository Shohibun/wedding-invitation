import { NotificationTemplateV2, TemplatePreview } from "./types";
import { TemplateCompiler } from "./compiler";
import { TemplateValidator } from "./validator";
import { TemplateRenderer } from "./renderer";

export const PreviewEngine = {
  generate(template: NotificationTemplateV2, variables: Record<string, string>): TemplatePreview {
    // 1. Compile to extract requirements
    const compiled = TemplateCompiler.compile(template);

    // 2. Validate missing variables
    const missingVariables = TemplateValidator.validateCompiled(compiled, variables);

    // 3. Render payload safely (Renderers handle fallback logic if variables are missing and strict is false)
    const renderedBody = TemplateRenderer.renderBody(template.channel, template.body, variables);
    const renderedSubject = TemplateRenderer.renderSubject(template.subject, variables);

    return {
      subject: renderedSubject,
      body: renderedBody,
      resolvedVariables: variables,
      missingVariables,
    };
  },
};
