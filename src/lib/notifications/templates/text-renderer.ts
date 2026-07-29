export class TextRenderer {
  render(body: string): string {
    // Removes any potential HTML tags and decodes entities if a user pasted rich text into a plaintext channel like SMS
    let text = body.replace(/<[^>]*>?/gm, "");

    // Un-escape basic HTML entities
    text = text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&nbsp;/g, " ");

    return text.trim();
  }
}
