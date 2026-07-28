export const ReportDateRange = {
  getPresetRange(preset: "today" | "last7days" | "last30days"): {
    startDate: string;
    endDate: string;
  } {
    const now = new Date();
    const end = new Date(now);
    const start = new Date(now);

    switch (preset) {
      case "today":
        start.setHours(0, 0, 0, 0);
        break;
      case "last7days":
        start.setDate(start.getDate() - 7);
        break;
      case "last30days":
        start.setDate(start.getDate() - 30);
        break;
    }

    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };
  },
};
