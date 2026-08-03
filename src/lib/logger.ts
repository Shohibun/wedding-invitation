/**
 * Structured Logging Abstraction
 *
 * Future-proofs the application for integrations with services like
 * Datadog, Sentry, or OpenTelemetry by providing a central point
 * for formatting log output.
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogPayload {
  message: string;
  context?: Record<string, unknown>;
  error?: unknown;
}

const log = (level: LogLevel, payload: LogPayload) => {
  const timestamp = new Date().toISOString();

  const formattedLog = {
    timestamp,
    level,
    message: payload.message,
    context: payload.context,
    error:
      payload.error instanceof Error
        ? {
            name: payload.error.name,
            message: payload.error.message,
            stack: payload.error.stack,
          }
        : payload.error,
  };

  // Stringify for production so log aggregators can parse the JSON easily
  const logString = JSON.stringify(formattedLog);

  switch (level) {
    case "info":
      console.info(logString);
      break;
    case "warn":
      console.warn(logString);
      break;
    case "error":
      console.error(logString);
      break;
    case "debug":
      console.debug(logString);
      break;
  }
};

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => log("info", { message, context }),

  warn: (message: string, context?: Record<string, unknown>) => log("warn", { message, context }),

  error: (message: string, error?: unknown, context?: Record<string, unknown>) =>
    log("error", { message, error, context }),

  debug: (message: string, context?: Record<string, unknown>) => log("debug", { message, context }),
};
