export type ActionType =
  "create" | "read" | "update" | "delete" | "publish" | "restore" | "archive" | "export" | "manage";

export type ResourceType =
  | "invitation"
  | "guest"
  | "template"
  | "marketplace"
  | "analytics"
  | "notification"
  | "publishing"
  | "builder"
  | "profile"
  | "workspace"
  | "billing"
  | "all";

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: ResourceType;
  action: ActionType;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  priority: number;
  system: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserRole {
  userId: string;
  roleId: string;
}

export interface AuthorizationResult {
  allowed: boolean;
  reason?: string;
}

export interface IAuthorizationRepository {
  getRoles(): Promise<Role[]>;
  getPermissions(): Promise<Permission[]>;
  getUserRoles(userId: string): Promise<Role[]>;
  getUserPermissions(userId: string): Promise<Permission[]>;
  getRoleById(roleId: string): Promise<Role | null>;
  getPermissionById(permissionId: string): Promise<Permission | null>;
}
