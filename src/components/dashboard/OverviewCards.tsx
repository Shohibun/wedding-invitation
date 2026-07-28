import React from "react";
import { DashboardMetric } from "../../features/dashboard/types";

export const OverviewCards: React.FC<{ metrics: Record<string, DashboardMetric> }> = ({
  metrics,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {Object.values(metrics).map((metric, i) => (
        <div
          key={i}
          className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col"
        >
          <span className="text-sm font-medium text-gray-500">{metric.label}</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
            {metric.trend !== undefined && (
              <span
                className={`text-xs font-semibold ${
                  metric.trendDirection === "up"
                    ? "text-green-600"
                    : metric.trendDirection === "down"
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {metric.trendDirection === "up"
                  ? "↑"
                  : metric.trendDirection === "down"
                    ? "↓"
                    : "−"}{" "}
                {metric.trend}%
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
