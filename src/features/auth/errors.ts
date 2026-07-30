export class AuthenticationError extends Error {
  public code: string;
  constructor(message: string, code: string = "AUTH_ERROR") {
    super(message);
    this.name = "AuthenticationError";
    this.code = code;
  }
}

export class SessionExpiredError extends AuthenticationError {
  constructor(message: string = "Session has expired") {
    super(message, "SESSION_EXPIRED");
    this.name = "SessionExpiredError";
  }
}

export class InvalidCredentialError extends AuthenticationError {
  constructor(message: string = "Invalid credentials provided") {
    super(message, "INVALID_CREDENTIALS");
    this.name = "InvalidCredentialError";
  }
}

export class EmailNotVerifiedError extends AuthenticationError {
  constructor(message: string = "Email address is not verified") {
    super(message, "EMAIL_NOT_VERIFIED");
    this.name = "EmailNotVerifiedError";
  }
}

export class RegistrationError extends AuthenticationError {
  constructor(message: string = "Registration failed") {
    super(message, "REGISTRATION_FAILED");
    this.name = "RegistrationError";
  }
}

export class PasswordResetError extends AuthenticationError {
  constructor(message: string = "Password reset failed") {
    super(message, "PASSWORD_RESET_FAILED");
    this.name = "PasswordResetError";
  }
}

export class UnauthorizedError extends AuthenticationError {
  constructor(message: string = "Unauthorized access") {
    super(message, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}
