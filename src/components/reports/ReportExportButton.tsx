import React from "react";
import { ReportData } from "../../features/reports/types";
import { useReportExport } from "../../hooks/useReportExport";

export const ReportExportButton: React.FC<{ report: ReportData }> = ({ report }) => {
  const { exportReport, exporting } = useReportExport();

  return (
    <div className="flex gap-2">
      <button
        disabled={exporting}
        onClick={() => exportReport(report, "csv")}
        className="px-3 py-1.5 text-sm border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-md disabled:opacity-50"
      >
        CSV
      </button>
      <button
        disabled={exporting}
        onClick={() => exportReport(report, "excel")}
        className="px-3 py-1.5 text-sm border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-md disabled:opacity-50"
      >
        Excel
      </button>
      <button
        disabled={exporting}
        onClick={() => exportReport(report, "pdf")}
        className="px-3 py-1.5 text-sm border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-md disabled:opacity-50"
      >
        PDF
      </button>
    </div>
  );
};
