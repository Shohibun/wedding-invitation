"use client";

import React from "react";
import { ReportFilter, ReportData } from "../../features/reports/types";
import { ReportHeader } from "./ReportHeader";
import { ReportFilters } from "./ReportFilters";
import { ReportSummaryComponent } from "./ReportSummary";
import { ReportSectionComponent } from "./ReportSection";
import { ReportExportButton } from "./ReportExportButton";
import { ReportEmptyState } from "./ReportEmptyState";
import { ReportLoadingState } from "./ReportLoadingState";

export interface ReportViewerProps {
  filter: ReportFilter;
  setFilter: (f: ReportFilter) => void;
  report: ReportData | null;
  loading: boolean;
  error: Error | null;
  onGenerate: () => void;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({
  filter,
  setFilter,
  report,
  loading,
  error,
  onGenerate,
}) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-start">
        <ReportHeader />
        {report && <ReportExportButton report={report} />}
      </div>

      <ReportFilters filter={filter} setFilter={setFilter} onGenerate={onGenerate} />

      {loading && <ReportLoadingState />}

      {error && !loading && (
        <ReportEmptyState
          title="Generation Failed"
          description={error.message}
          action={onGenerate}
        />
      )}

      {!loading && !error && !report && (
        <ReportEmptyState
          title="No Report Generated"
          description="Select your filters and click Generate."
          action={onGenerate}
        />
      )}

      {report && !loading && !error && (
        <div className="flex flex-col gap-8 mt-4">
          <ReportSummaryComponent summary={report.summary} />
          {report.sections.map((section, idx) => (
            <ReportSectionComponent key={idx} section={section} />
          ))}
        </div>
      )}
    </div>
  );
};
