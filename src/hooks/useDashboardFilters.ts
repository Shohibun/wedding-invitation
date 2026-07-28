import { DashboardFilter } from "../features/dashboard/types";
import { DashboardDateRange } from "../lib/dashboard/date-range";

export const useDashboardFilters = (
  currentFilter: DashboardFilter,
  setFilter: (filter: DashboardFilter) => void
) => {
  const setPreset = (preset: "today" | "yesterday" | "last7days" | "last30days") => {
    const range = DashboardDateRange.getPresetRange(preset);
    setFilter({
      ...currentFilter,
      ...range,
    });
  };

  const setGuest = (guestId?: string) => {
    setFilter({
      ...currentFilter,
      guestId,
    });
  };

  return { setPreset, setGuest };
};
