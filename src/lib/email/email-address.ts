export const EmailAddressUtil = {
  isValid(email: string): boolean {
    if (!email) return false;
    // Basic RFC 5322 compatible regex check
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Support "Name <email@domain.com>" format
    if (email.includes("<") && email.includes(">")) {
      const match = email.match(/<([^>]+)>/);
      if (match && match[1]) {
        return re.test(match[1].trim());
      }
      return false;
    }

    return re.test(email.trim());
  },

  format(email: string, name?: string): string {
    if (!name) return email.trim();
    return `${name.trim()} <${email.trim()}>`;
  },

  extractAddress(emailWithMaybeName: string): string {
    if (emailWithMaybeName.includes("<") && emailWithMaybeName.includes(">")) {
      const match = emailWithMaybeName.match(/<([^>]+)>/);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    return emailWithMaybeName.trim();
  },
};
