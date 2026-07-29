import { EscapeUtil } from "./escape";

export class HtmlRenderer {
  render(body: string, variables: Record<string, string>): string {
    // 1. Escape the provided variables before replacing
    const escapedVariables: Record<string, string> = {};
    for (const [key, value] of Object.entries(variables)) {
      escapedVariables[key] = EscapeUtil.escapeHtml(value);
    }

    // 2. Perform the replacement with escaped values (handled upstream by compiler, but good for raw fallback)
    // Here we assume the body is already HTML formatted (e.g. from a Rich Text Editor)
    // We just wrap it in a standard HTML document structure if needed.

    return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; line-height: 1.5; color: #333; }
    a { color: #0066cc; }
  </style>
</head>
<body>
  ${body}
</body>
</html>`;
  }
}
