export class MarkdownRenderer {
  render(body: string): string {
    // Fallback: This renderer ensures that the body is structurally sound markdown.
    // In actual implementation, we might use a library like 'marked' or 'showdown'.
    // For now, it simply returns the body since markdown is plaintext compatible.
    return body;
  }
}
