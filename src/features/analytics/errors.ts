export class AnalyticsError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AnalyticsValidationError extends AnalyticsError {
  constructor(
    message: string,
    public readonly details: Record<string, string[] | undefined>
  ) {
    super(message, "VALIDATION_ERROR");
  }
}

export class AnalyticsDispatchError extends AnalyticsError {
  constructor(message: string) {
    super(message, "DISPATCH_ERROR");
  }
}

export class AnalyticsRepositoryError extends AnalyticsError {
  constructor(
    message: string,
    public readonly originalError?: unknown
  ) {
    super(message, "REPOSITORY_ERROR");
  }
}

export class AnalyticsAggregationError extends AnalyticsError {
  constructor(message: string) {
    super(message, "AGGREGATION_ERROR");
  }
}
