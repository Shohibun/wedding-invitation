import { Anomaly, InsightRawData } from "./types";
import { INSIGHT_THRESHOLDS } from "../../lib/insights/thresholds";
import { v4 as uuidv4 } from "uuid";

export const AnomalyDetector = {
  detect(rawData: InsightRawData): Anomaly[] {
    const anomalies: Anomaly[] = [];

    const currentVisits = rawData.currentSessions.length;
    const prevVisits = rawData.previousSessions.length;

    if (prevVisits > 5 && currentVisits > prevVisits * INSIGHT_THRESHOLDS.trafficSpikeMultiplier) {
      anomalies.push({
        id: uuidv4(),
        metric: "Traffic",
        expected: prevVisits,
        actual: currentVisits,
        severity: "medium",
        description: `Unusual traffic spike detected. Volume is ${Math.round(currentVisits / prevVisits)}x higher than baseline.`,
      });
    }

    return anomalies;
  },
};
