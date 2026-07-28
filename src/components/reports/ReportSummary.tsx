import React from "react";
import { ReportSummary } from "../../features/reports/types";

export const ReportSummaryComponent: React.FC<{ summary: ReportSummary }> = ({ summary }) => (
  <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
    <h2 className="text-xl font-bold text-gray-900">{summary.title}</h2>
    <div className="mt-4 flex gap-8">
      <div>
        <span className="block text-xs text-gray-500 uppercase tracking-wider">Generated At</span>
        <span className="block text-sm font-medium text-gray-900 mt-1">
          {new Date(summary.generatedAt).toLocaleString()}
        </span>
      </div>
      <div>
        <span className="block text-xs text-gray-500 uppercase tracking-wider">Total Records</span>
        <span className="block text-sm font-medium text-gray-900 mt-1">{summary.totalRecords}</span>
      </div>
    </div>
  </div>
);
