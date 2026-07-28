export const DashboardDateRange = {
  getPresetRange(preset: "today" | "yesterday" | "last7days" | "last30days"): {
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
      case "yesterday":
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(end.getDate() - 1);
        end.setHours(23, 59, 59, 999);
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
