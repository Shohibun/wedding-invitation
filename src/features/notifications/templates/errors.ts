import { NotificationError } from "../errors";

export class TemplateSyntaxError extends NotificationError {
  constructor(message: string) {
    super(message, "TEMPLATE_SYNTAX_ERROR");
  }
}

export class VariableNotFoundError extends NotificationError {
  constructor(message: string) {
    super(message, "VARIABLE_NOT_FOUND_ERROR");
  }
}

export class RenderError extends NotificationError {
  constructor(message: string) {
    super(message, "RENDER_ERROR");
  }
}

export class CompileError extends NotificationError {
  constructor(message: string) {
    super(message, "COMPILE_ERROR");
  }
}
