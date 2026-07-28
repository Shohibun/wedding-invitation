export class DashboardError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class DashboardRepositoryError extends DashboardError {
  constructor(
    message: string,
    public readonly originalError?: unknown
  ) {
    super(message, "DASHBOARD_REPOSITORY_ERROR");
  }
}

export class DashboardCalculationError extends DashboardError {
  constructor(message: string) {
    super(message, "DASHBOARD_CALCULATION_ERROR");
  }
}

export class DashboardValidationError extends DashboardError {
  constructor(
    message: string,
    public readonly details: Record<string, string[] | undefined>
  ) {
    super(message, "DASHBOARD_VALIDATION_ERROR");
  }
}
