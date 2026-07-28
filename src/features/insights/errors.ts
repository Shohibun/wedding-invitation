export class InsightError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class TrendCalculationError extends InsightError {
  constructor(message: string) {
    super(message, "TREND_CALCULATION_ERROR");
  }
}

export class RecommendationError extends InsightError {
  constructor(message: string) {
    super(message, "RECOMMENDATION_ERROR");
  }
}

export class KPIError extends InsightError {
  constructor(message: string) {
    super(message, "KPI_ERROR");
  }
}

export class ValidationError extends InsightError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
  }
}
