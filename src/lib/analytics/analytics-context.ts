import { createContext } from "react";
import { AnalyticsContextValue } from "./analytics-types";

export const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);
