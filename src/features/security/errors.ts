export class SecurityError extends Error {
  constructor(
    message: string,
    public readonly code: string = "SECURITY_ERROR"
  ) {
    super(message);
    this.name = "SecurityError";
  }
}

export class SessionNotFoundError extends SecurityError {
  constructor(sessionId: string) {
    super(`Session not found: ${sessionId}`, "SESSION_NOT_FOUND");
    this.name = "SessionNotFoundError";
  }
}

export class DeviceNotFoundError extends SecurityError {
  constructor(deviceId: string) {
    super(`Device not found: ${deviceId}`, "DEVICE_NOT_FOUND");
    this.name = "DeviceNotFoundError";
  }
}
