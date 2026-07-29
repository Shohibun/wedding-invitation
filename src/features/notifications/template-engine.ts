import { NotificationTemplate, NotificationVariables } from "./types";
import { TemplateRenderer } from "./templates/renderer";

/**
 * @deprecated Use TemplateRenderer from `features/notifications/templates/renderer.ts` instead.
 * Preserved for backward compatibility with Sprint 17A definitions.
 */
export const TemplateEngine = {
  render(template: NotificationTemplate, variables: NotificationVariables): string {
    // Forwarding to the new universal renderer, assuming "email" (html) as default generic render if channel is missing on old template schema
    return TemplateRenderer.renderBody(template.channel || "email", template.body, variables);
  },

  renderSubject(template: NotificationTemplate, variables: NotificationVariables): string {
    return TemplateRenderer.renderSubject(template.subject, variables) || "";
  },
};
