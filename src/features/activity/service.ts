import { activityRepository } from "./repository";
import { CreateActivitySchema } from "./schema";
import { Activity, CreateActivityDTO } from "./types";

export const ActivityService = {
  /**
   * Logs a new activity into the audit trail.
   * Validates the payload structure to ensure data integrity.
   */
  log: async (payload: CreateActivityDTO): Promise<Activity> => {
    // 1. Strict Zod Validation of the action and payload
    const validatedPayload = CreateActivitySchema.parse(payload);

    // 2. Persist append-only log
    return await activityRepository.logActivity(validatedPayload);
  },

  /**
   * Retrieves the timeline of activities for a specific invitation.
   * Useful for displaying the ActivityTimeline UI.
   */
  getTimeline: async (invitationId: string, limit?: number): Promise<Activity[]> => {
    return await activityRepository.getActivitiesByInvitation(invitationId, limit);
  },
};
