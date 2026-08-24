export class StorageAudio {
  static getExtension(mimeType: string): string | null {
    switch (mimeType) {
      case "audio/mpeg":
        return ".mp3";
      case "audio/wav":
        return ".wav";
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
