import { useState } from "react";
import { ReportFilter } from "../features/reports/types";
import { ReportDateRange } from "../lib/reports/date-range";

export const useReportFilters = (initialFilter: ReportFilter) => {
  const [filter, setFilter] = useState<ReportFilter>(initialFilter);

  const setPreset = (preset: "today" | "last7days" | "last30days") => {
    setFilter({
      ...filter,
      ...ReportDateRange.getPresetRange(preset),
    });
  };

  const setReportType = (type: ReportFilter["reportType"]) => {
    setFilter({ ...filter, reportType: type });
  };

  return { filter, setFilter, setPreset, setReportType };
};
