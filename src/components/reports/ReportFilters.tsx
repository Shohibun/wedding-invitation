import React from "react";
import { ReportFilter } from "../../features/reports/types";
import { useReportFilters } from "../../hooks/useReportFilters";

export const ReportFilters: React.FC<{
  filter: ReportFilter;
  setFilter: (f: ReportFilter) => void;
  onGenerate: () => void;
}> = ({ filter, setFilter, onGenerate }) => {
  const { setPreset, setReportType } = useReportFilters(filter);

  return (
    <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-end">
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-500 mb-1">Date Range</label>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setPreset("today");
              setFilter(filter);
            }}
            className="px-3 py-1 text-sm border rounded-md"
          >
            Today
          </button>
          <button
            onClick={() => {
              setPreset("last7days");
              setFilter(filter);
            }}
            className="px-3 py-1 text-sm border rounded-md"
          >
            Last 7 Days
          </button>
          <button
            onClick={() => {
              setPreset("last30days");
              setFilter(filter);
            }}
            className="px-3 py-1 text-sm border rounded-md"
          >
            Last 30 Days
          </button>
        </div>
      </div>
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-500 mb-1">Report Type</label>
        <select
          value={filter.reportType}
          onChange={(e) => {
            setReportType(e.target.value as ReportFilter["reportType"]);
            setFilter(filter);
          }}
          className="w-full px-3 py-1.5 text-sm border rounded-md"
        >
          <option value="overview">Overview</option>
          <option value="visitor">Visitor</option>
          <option value="traffic">Traffic</option>
        </select>
      </div>
      <button
        onClick={onGenerate}
        className="px-6 py-1.5 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Generate Report
      </button>
    </div>
  );
};
