import { NotificationError } from "../errors";

export class EmailValidationError extends NotificationError {
  constructor(message: string) {
    super(message, "EMAIL_VALIDATION_ERROR");
  }
}

export class ProviderError extends NotificationError {
  constructor(message: string) {
    super(message, "EMAIL_PROVIDER_ERROR");
  }
}

export class DeliveryError extends NotificationError {
  constructor(message: string) {
    super(message, "EMAIL_DELIVERY_ERROR");
  }
}

export class AddressError extends NotificationError {
  constructor(message: string) {
    super(message, "EMAIL_ADDRESS_ERROR");
  }
}

export class AttachmentError extends NotificationError {
  constructor(message: string) {
    super(message, "EMAIL_ATTACHMENT_ERROR");
  }
}
