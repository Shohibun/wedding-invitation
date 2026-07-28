export const VisitorDetector = {
  getLanguage(): string {
    if (typeof navigator === "undefined") return "unknown";
    return (
      navigator.language ||
      ((navigator as unknown as Record<string, unknown>).userLanguage as string) ||
      "unknown"
    );
  },

  getTimezone(): string {
    if (typeof Intl === "undefined") return "unknown";
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
  },

  getUserAgent(): string {
    if (typeof navigator === "undefined") return "unknown";
    return navigator.userAgent;
  },

  getReferrer(): string {
    if (typeof document === "undefined") return "";
    return document.referrer;
  },

  getCurrentPath(): string {
    if (typeof window === "undefined") return "";
    return window.location.pathname + window.location.search;
  },
};
