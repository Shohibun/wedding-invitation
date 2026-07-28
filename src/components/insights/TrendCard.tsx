import React from "react";
import { Trend } from "../../features/insights/types";

export const TrendCard: React.FC<{ trend: Trend }> = ({ trend }) => {
  const isUp = trend.direction === "up";
  const color = trend.isFavorable
    ? "text-green-600 bg-green-50 border-green-100"
    : "text-red-600 bg-red-50 border-red-100";

  return (
    <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <span className="text-sm font-medium text-gray-600">Metric: {trend.kpiId}</span>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Previous: {trend.previousValue}</span>
          <span className="text-sm font-semibold text-gray-900">Current: {trend.currentValue}</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${color}`}>
          {isUp ? "↑" : trend.direction === "down" ? "↓" : "−"} {Math.abs(trend.growthPercentage)}%
        </div>
      </div>
    </div>
  );
};
