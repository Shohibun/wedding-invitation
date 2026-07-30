import { IAuthorizationRepository, Permission, Role } from "./types";
import { DefaultRoles, RolePermissionMap } from "./roles";
import { DefaultPermissions, getPermissionByResourceAction } from "./permissions";
import { ActionType, ResourceType } from "./types";

export class MockAuthorizationRepository implements IAuthorizationRepository {
  private userRoleAssignments: Map<string, string[]> = new Map();

  constructor() {
    // Seed some mock user role data
    // Admin user
    this.userRoleAssignments.set("user-admin-id", ["role-admin"]);
    // Guest user
    this.userRoleAssignments.set("user-guest-id", ["role-guest"]);
  }

  async getRoles(): Promise<Role[]> {
    return Object.values(DefaultRoles);
  }

  async getPermissions(): Promise<Permission[]> {
    return DefaultPermissions;
  }

  async getUserRoles(userId: string): Promise<Role[]> {
    const roleIds = this.userRoleAssignments.get(userId) || ["role-viewer"]; // Default to viewer if unknown
    const roles: Role[] = [];
    for (const id of roleIds) {
      const role = await this.getRoleById(id);
      if (role) roles.push(role);
    }
    return roles;
  }

  async getUserPermissions(userId: string): Promise<Permission[]> {
    const roles = await this.getUserRoles(userId);
    const permissions: Permission[] = [];
    const seen = new Set<string>();

    for (const role of roles) {
      const grants = RolePermissionMap[role.id] || [];
      for (const grant of grants) {
        if (grant === "*") {
          return DefaultPermissions;
        }
        const [resource, action] = grant.split(":");

        if (action === "*") {
          // Grant all actions for this resource
          const resPerms = DefaultPermissions.filter((p) => p.resource === resource);
          for (const rp of resPerms) {
            const key = `${rp.resource}:${rp.action}`;
            if (!seen.has(key)) {
              seen.add(key);
              permissions.push(rp);
            }
          }
        } else {
          // Grant specific action
          const perm = getPermissionByResourceAction(
            resource as ResourceType,
            action as ActionType
          );
          if (perm) {
            const key = `${perm.resource}:${perm.action}`;
            if (!seen.has(key)) {
              seen.add(key);
              permissions.push(perm);
            }
          }
        }
      }
    }

    return permissions;
  }

  async getRoleById(roleId: string): Promise<Role | null> {
    const role = Object.values(DefaultRoles).find((r) => r.id === roleId);
    return role || null;
  }

  async getPermissionById(permissionId: string): Promise<Permission | null> {
    return DefaultPermissions.find((p) => p.id === permissionId) || null;
  }
}

// Default export instance ready to be used
export const authorizationRepository = new MockAuthorizationRepository();
