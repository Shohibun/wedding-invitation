export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
export const MAX_AUDIO_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
export const ALLOWED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/mp4",
  "audio/m4a",
  "audio/aac",
  "audio/ogg",
];

export class StorageValidation {
  static isImage(mimeType: string): boolean {
    return ALLOWED_IMAGE_TYPES.includes(mimeType);
  }

  static isAudio(mimeType: string): boolean {
    return ALLOWED_AUDIO_TYPES.includes(mimeType);
  }

  static isValidImageSize(sizeBytes: number): boolean {
    return sizeBytes <= MAX_IMAGE_SIZE_BYTES;
  }

  static isValidAudioSize(sizeBytes: number): boolean {
    return sizeBytes <= MAX_AUDIO_SIZE_BYTES;
  }
}
