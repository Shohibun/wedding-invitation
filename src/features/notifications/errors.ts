export class NotificationError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class QueueError extends NotificationError {
  constructor(message: string) {
    super(message, "QUEUE_ERROR");
  }
}

export class DispatchError extends NotificationError {
  constructor(message: string) {
    super(message, "DISPATCH_ERROR");
  }
}

export class TemplateError extends NotificationError {
  constructor(message: string) {
    super(message, "TEMPLATE_ERROR");
  }
}

export class ValidationError extends NotificationError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
  }
}
