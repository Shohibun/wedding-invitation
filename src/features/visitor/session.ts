// Domain logic for Session specific concerns
import { VisitorSession } from "./types";
import { VisitorUtils } from "./visitor-utils";

export const VisitorSessionLogic = {
  closeSession(session: VisitorSession): VisitorSession {
    const endedAt = new Date().toISOString();
    return {
      ...session,
      endedAt,
      duration: VisitorUtils.calculateDurationSeconds(session.startedAt, endedAt),
    };
  },
};
