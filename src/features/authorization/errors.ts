export class AuthorizationError extends Error {
  constructor(
    message: string,
    public readonly code: string = "AUTHORIZATION_ERROR"
  ) {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class AccessDeniedError extends AuthorizationError {
  constructor(message: string = "Access denied") {
    super(message, "ACCESS_DENIED");
    this.name = "AccessDeniedError";
  }
}

export class RoleNotFoundError extends AuthorizationError {
  constructor(roleId: string) {
    super(`Role not found: ${roleId}`, "ROLE_NOT_FOUND");
    this.name = "RoleNotFoundError";
  }
}

export class PermissionNotFoundError extends AuthorizationError {
  constructor(permissionId: string) {
    super(`Permission not found: ${permissionId}`, "PERMISSION_NOT_FOUND");
    this.name = "PermissionNotFoundError";
  }
}
