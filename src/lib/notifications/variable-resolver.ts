import { NotificationVariables } from "../../features/notifications/types";
import { VariableEngine } from "./templates/variable-engine";

/**
 * @deprecated Use VariableEngine from `lib/notifications/templates/variable-engine.ts` instead.
 */
export const VariableResolver = {
  resolve(template: string, variables: NotificationVariables = {}): string {
    return VariableEngine.resolve(template, variables, false);
  },
};
