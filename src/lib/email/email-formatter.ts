export const EmailFormatter = {
  formatSubject(subject: string): string {
    return subject.trim().replace(/\s+/g, " ");
  },

  formatHtml(body: string): string {
    // Ensures HTML is at least wrapped in generic container if not already
    if (!body.includes("<html") && !body.includes("<body")) {
      return `<!DOCTYPE html><html><body>${body}</body></html>`;
    }
    return body;
  },
};
