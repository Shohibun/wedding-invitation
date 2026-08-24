export const AvatarUtils = {
  generateInitials(fullName: string): string {
    const parts = fullName.trim().split(" ");
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  },

  validateAvatarSize(fileSizeInBytes: number, maxMb: number): boolean {
    return fileSizeInBytes <= maxMb * 1024 * 1024;
  },

  validateAvatarType(mimeType: string, allowedTypes: readonly string[]): boolean {
    return allowedTypes.includes(mimeType);
  },
};
