export class ProfileCache {
  private static cache: Map<string, { data: unknown; timestamp: number }> = new Map();
  private static TTL_MS = 60000;

  static get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.TTL_MS) {
      this.cache.delete(key);
      return null;
    }
    return entry.data as T;
  }

  static set(key: string, data: unknown): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  static clear(key: string): void {
    this.cache.delete(key);
  }

  static clearAll(): void {
    this.cache.clear();
  }
}
