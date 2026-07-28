import { VisitorSession } from "../../features/visitor/types";

export const InsightComparison = {
  compareTraffic(current: VisitorSession[], previous: VisitorSession[]): number {
    return current.length - previous.length;
  },
};
