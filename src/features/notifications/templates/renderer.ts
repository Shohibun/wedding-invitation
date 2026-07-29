import { NotificationChannel } from "../types";
import { HtmlRenderer } from "../../../lib/notifications/templates/html-renderer";
import { TextRenderer } from "../../../lib/notifications/templates/text-renderer";
import { MarkdownRenderer } from "../../../lib/notifications/templates/markdown-renderer";
import { RenderError } from "./errors";
import { VariableEngine } from "../../../lib/notifications/templates/variable-engine";

const htmlRenderer = new HtmlRenderer();
const textRenderer = new TextRenderer();
const markdownRenderer = new MarkdownRenderer();

export const TemplateRenderer = {
  renderBody(
    channel: NotificationChannel,
    rawBody: string,
    variables: Record<string, string>
  ): string {
    try {
      // 1. Resolve raw variables first
      const resolvedBody = VariableEngine.resolve(rawBody, variables, false);

      // 2. Pass to polymorphic renderer based on target channel
      switch (channel) {
        case "email":
          return htmlRenderer.render(resolvedBody, variables);
        case "whatsapp":
        case "sms":
        case "push":
          return textRenderer.render(resolvedBody);
        case "in_app":
        case "webhook":
          return markdownRenderer.render(resolvedBody);
        default:
          return textRenderer.render(resolvedBody);
      }
    } catch (err) {
      throw new RenderError(
        `Failed to render template for channel ${channel}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  },

  renderSubject(
    rawSubject: string | undefined,
    variables: Record<string, string>
  ): string | undefined {
    if (!rawSubject) return undefined;
    try {
      return VariableEngine.resolve(rawSubject, variables, false);
    } catch (err) {
      throw new RenderError(
        `Failed to render subject: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  },
};
