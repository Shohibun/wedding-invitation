export class TrackingError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class SessionExpiredError extends TrackingError {
  constructor(message: string = "Visitor session has expired") {
    super(message, "SESSION_EXPIRED");
  }
}

export class VisitorValidationError extends TrackingError {
  constructor(
    message: string,
    public readonly details: Record<string, string[] | undefined>
  ) {
    super(message, "VALIDATION_ERROR");
  }
}

export class TrackingRepositoryError extends TrackingError {
  constructor(
    message: string,
    public readonly originalError?: unknown
  ) {
    super(message, "REPOSITORY_ERROR");
  }
}
