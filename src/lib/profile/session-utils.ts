export const SessionUtils = {
  isExpired(expiresAt: string): boolean {
    return new Date(expiresAt) < new Date();
  },

  timeUntilExpiry(expiresAt: string): number {
    const diff = new Date(expiresAt).getTime() - Date.now();
    return diff > 0 ? diff : 0;
  },
};
