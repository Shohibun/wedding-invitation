export class ReportError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ReportGenerationError extends ReportError {
  constructor(
    message: string,
    public readonly originalError?: unknown
  ) {
    super(message, "REPORT_GENERATION_ERROR");
  }
}

export class ReportExportError extends ReportError {
  constructor(
    message: string,
    public readonly originalError?: unknown
  ) {
    super(message, "REPORT_EXPORT_ERROR");
  }
}

export class ReportValidationError extends ReportError {
  constructor(
    message: string,
    public readonly details: Record<string, string[] | undefined>
  ) {
    super(message, "REPORT_VALIDATION_ERROR");
  }
}
