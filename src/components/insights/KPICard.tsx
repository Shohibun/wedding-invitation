import React from "react";
import { KPI } from "../../features/insights/types";

export const KPICard: React.FC<{ kpi: KPI }> = ({ kpi }) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{kpi.label}</span>
    <div className="mt-2 flex items-baseline gap-1">
      <span className="text-3xl font-bold text-gray-900">{kpi.value}</span>
      {kpi.unit && <span className="text-sm text-gray-500">{kpi.unit}</span>}
    </div>
  </div>
);
