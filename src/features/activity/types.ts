import { z } from "zod";
import { ActivityAction, ActivitySchema, CreateActivitySchema } from "./schema";

export type ActivityActionType = z.infer<typeof ActivityAction>;
export type Activity = z.infer<typeof ActivitySchema>;
export type CreateActivityDTO = z.infer<typeof CreateActivitySchema>;

export interface ActivityRepositoryPort {
  logActivity(payload: CreateActivityDTO): Promise<Activity>;
  getActivitiesByInvitation(invitationId: string, limit?: number): Promise<Activity[]>;
}
