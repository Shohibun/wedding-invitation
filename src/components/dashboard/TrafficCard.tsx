import React from "react";
import { DashboardChartData } from "../../features/dashboard/types";

export const TrafficCard: React.FC<{ charts: Record<string, DashboardChartData[]> }> = ({
  charts,
}) => {
  const devices = charts.devices || [];

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Traffic by Device</h3>
      <div className="space-y-4">
        {devices.map((data, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{data.label}</span>
            <span className="text-sm font-semibold text-gray-900">{data.value} visits</span>
          </div>
        ))}
        {devices.length === 0 && <p className="text-sm text-gray-500">No device data available.</p>}
      </div>
    </div>
  );
};
