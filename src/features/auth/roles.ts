export const ROLES = {
  OWNER: "owner",
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// Role hierarchy (lower index = higher privilege)
const ROLE_HIERARCHY: Role[] = [ROLES.OWNER, ROLES.ADMIN, ROLES.EDITOR, ROLES.VIEWER];

/**
 * Check if a user's role has the required permissions.
 * A user with a role higher in the hierarchy has access to lower privilege roles.
 * @param userRole - The role of the user
 * @param requiredRole - The minimum role required
 * @returns boolean
 */
export function hasRole(userRole: Role, requiredRole: Role): boolean {
  const userRank = ROLE_HIERARCHY.indexOf(userRole);
  const requiredRank = ROLE_HIERARCHY.indexOf(requiredRole);

  // If either role is invalid, deny access
  if (userRank === -1 || requiredRank === -1) {
    return false;
  }

  // User rank must be less than or equal to required rank (lower index = higher privilege)
  return userRank <= requiredRank;
}
