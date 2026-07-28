import { z } from "zod";
import {
  VisitorSessionSchema,
  DeviceInfoSchema,
  ViewportSchema,
  TrackingEventSchema,
  ScrollMetricsSchema,
} from "./schema";

export type VisitorSession = z.infer<typeof VisitorSessionSchema>;
export type DeviceInfo = z.infer<typeof DeviceInfoSchema>;
export type Viewport = z.infer<typeof ViewportSchema>;
export type TrackingEvent = z.infer<typeof TrackingEventSchema>;
export type ScrollMetrics = z.infer<typeof ScrollMetricsSchema>;

export interface VisitorRepositoryPort {
  createSession(session: VisitorSession): Promise<VisitorSession>;
  updateSession(session: VisitorSession): Promise<VisitorSession>;
  closeSession(sessionId: string, endedAt: string, duration: number): Promise<void>;
  getSession(sessionId: string): Promise<VisitorSession | null>;
  listSessions(limit?: number): Promise<VisitorSession[]>;
  listInvitationSessions(invitationId: string, limit?: number): Promise<VisitorSession[]>;
  listGuestSessions(guestId: string, limit?: number): Promise<VisitorSession[]>;
  deleteSession(sessionId: string): Promise<void>;
}
