export class ProfileError extends Error {
  constructor(
    message: string,
    public readonly code: string = "PROFILE_ERROR"
  ) {
    super(message);
    this.name = "ProfileError";
  }
}

export class ProfileNotFoundError extends ProfileError {
  constructor(userId: string) {
    super(`Profile not found for user: ${userId}`, "PROFILE_NOT_FOUND");
    this.name = "ProfileNotFoundError";
  }
}

export class InvalidAvatarError extends ProfileError {
  constructor(message: string) {
    super(message, "INVALID_AVATAR");
    this.name = "InvalidAvatarError";
  }
}

export class SessionTerminationError extends ProfileError {
  constructor(sessionId: string) {
    super(`Failed to terminate session: ${sessionId}`, "SESSION_TERMINATION_FAILED");
    this.name = "SessionTerminationError";
  }
}
