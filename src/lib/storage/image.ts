export class StorageImage {
  static getExtension(mimeType: string): string | null {
    switch (mimeType) {
      case "image/png":
        return ".png";
      case "image/jpeg":
        return ".jpg";
      case "image/webp":
        return ".webp";
      default:
        return null;
    }
  }

  static generatePath(prefix: string, mimeType: string): string {
    const ext = this.getExtension(mimeType) || "";
    const uniqueId = crypto.randomUUID();
    return `${prefix}/${uniqueId}${ext}`;
  }
}
