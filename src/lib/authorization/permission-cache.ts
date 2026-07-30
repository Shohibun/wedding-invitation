/**
 * Ephemeral memory cache to prevent redundant resolution of permissions
 * for the same user in the same request cycle or local session.
 */
export class PermissionCache {
  private static userRolesCache: Map<string, { roles: string[]; timestamp: number }> = new Map();
  private static userPermissionsCache: Map<string, { permissions: string[]; timestamp: number }> =
    new Map();
  private static TTL_MS = 60000; // 1 minute default TTL

  static getRoles(userId: string): string[] | null {
    const entry = this.userRolesCache.get(userId);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.TTL_MS) {
      this.userRolesCache.delete(userId);
      return null;
    }
    return entry.roles;
  }

  static setRoles(userId: string, roles: string[]): void {
    this.userRolesCache.set(userId, { roles, timestamp: Date.now() });
  }

  static getPermissions(userId: string): string[] | null {
    const entry = this.userPermissionsCache.get(userId);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.TTL_MS) {
      this.userPermissionsCache.delete(userId);
      return null;
    }
    return entry.permissions;
  }

  static setPermissions(userId: string, permissions: string[]): void {
    this.userPermissionsCache.set(userId, { permissions, timestamp: Date.now() });
  }

  static clearUser(userId: string): void {
    this.userRolesCache.delete(userId);
    this.userPermissionsCache.delete(userId);
  }

  static clearAll(): void {
    this.userRolesCache.clear();
    this.userPermissionsCache.clear();
  }
}
