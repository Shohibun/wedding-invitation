import { ANALYTICS_EVENTS } from "./constants";

export type AnalyticsEventType = keyof typeof ANALYTICS_EVENTS;

// Extracts the string values dynamically so Zod can use them
export const EventTypeValues = Object.values(ANALYTICS_EVENTS) as [string, ...string[]];
