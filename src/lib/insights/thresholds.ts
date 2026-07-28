import { Thresholds } from "../../features/insights/types";

export const INSIGHT_THRESHOLDS: Thresholds = {
  bounceRateHigh: 70, // above 70% is high bounce rate
  rsvpConversionLow: 30, // below 30% conversion is poor
  galleryEngagementLow: 20, // below 20% of visitors looking at gallery is poor
  musicEngagementLow: 10, // below 10% playing music is poor
  sessionDurationLow: 30, // below 30 seconds is poor
  trafficSpikeMultiplier: 3, // 3x the baseline is a spike
};
