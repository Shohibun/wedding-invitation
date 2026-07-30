export class WorkspaceError extends Error {
  constructor(
    message: string,
    public readonly code: string = "WORKSPACE_ERROR"
  ) {
    super(message);
    this.name = "WorkspaceError";
  }
}

export class WorkspaceNotFoundError extends WorkspaceError {
  constructor(identifier: string) {
    super(`Workspace not found: ${identifier}`, "WORKSPACE_NOT_FOUND");
    this.name = "WorkspaceNotFoundError";
  }
}

export class DuplicateSlugError extends WorkspaceError {
  constructor(slug: string) {
    super(`Workspace slug already in use: ${slug}`, "DUPLICATE_SLUG");
    this.name = "DuplicateSlugError";
  }
}

export class WorkspaceLimitExceededError extends WorkspaceError {
  constructor(limit: number) {
    super(`Workspace limit exceeded. Maximum allowed: ${limit}`, "WORKSPACE_LIMIT_EXCEEDED");
    this.name = "WorkspaceLimitExceededError";
  }
}

export class InvalidInvitationError extends WorkspaceError {
  constructor(message: string = "Invalid or expired invitation") {
    super(message, "INVALID_INVITATION");
    this.name = "InvalidInvitationError";
  }
}
