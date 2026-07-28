import { ReportData, ReportFilter, ReportRawData, ReportSection } from "./types";
import { v4 as uuidv4 } from "uuid";

export const ReportBuilder = {
  build(filter: ReportFilter, rawData: ReportRawData): ReportData {
    return {
      id: uuidv4(),
      summary: {
        title: `Analytics Report - ${filter.reportType.toUpperCase()}`,
        generatedAt: new Date().toISOString(),
        totalRecords: rawData.events.length + rawData.sessions.length,
        metadata: {
          startDate: filter.startDate,
          endDate: filter.endDate,
        },
      },
      sections: this.buildSections(filter, rawData),
    };
  },

  buildSections(filter: ReportFilter, rawData: ReportRawData): ReportSection[] {
    const sections: ReportSection[] = [];

    // Base Section: Overview
    sections.push({
      title: "Overview",
      description: "High-level summary of the period",
      headers: ["Metric", "Value"],
      rows: [
        ["Total Sessions", rawData.sessions.length],
        ["Total Events", rawData.events.length],
      ],
    });

    // We can switch on filter.reportType to build specific sections
    if (filter.reportType === "visitor" || filter.reportType === "overview") {
      sections.push({
        title: "Visitor Log",
        headers: ["Session ID", "Started At", "Duration (s)", "Device"],
        rows: rawData.sessions
          .slice(0, 100)
          .map((s) => [s.sessionId, s.startedAt, s.duration ?? 0, s.device || "Unknown"]),
      });
    }

    if (filter.reportType === "traffic" || filter.reportType === "overview") {
      sections.push({
        title: "Event Timeline",
        headers: ["Time", "Event Type", "Guest ID"],
        rows: rawData.events
          .slice(0, 100)
          .map((e) => [e.timestamp, e.eventType, e.guestId || "Anonymous"]),
      });
    }

    return sections;
  },
};
