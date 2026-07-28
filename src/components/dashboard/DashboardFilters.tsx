import React from "react";
import { DashboardFilter } from "../../features/dashboard/types";
import { useDashboardFilters } from "../../hooks/useDashboardFilters";

export const DashboardFilters: React.FC<{
  filter: DashboardFilter;
  setFilter: (f: DashboardFilter) => void;
}> = ({ filter, setFilter }) => {
  const { setPreset } = useDashboardFilters(filter, setFilter);

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      <button
        onClick={() => setPreset("today")}
        className="px-3 py-1 text-sm border rounded-full hover:bg-gray-50"
      >
        Today
      </button>
      <button
        onClick={() => setPreset("yesterday")}
        className="px-3 py-1 text-sm border rounded-full hover:bg-gray-50"
      >
        Yesterday
      </button>
      <button
        onClick={() => setPreset("last7days")}
        className="px-3 py-1 text-sm border rounded-full hover:bg-gray-50"
      >
        Last 7 Days
      </button>
      <button
        onClick={() => setPreset("last30days")}
        className="px-3 py-1 text-sm bg-black text-white border border-black rounded-full"
      >
        Last 30 Days
      </button>
    </div>
  );
};
