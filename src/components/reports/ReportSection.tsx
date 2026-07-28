import React from "react";
import { ReportSection } from "../../features/reports/types";
import { ReportTable } from "./ReportTable";

export const ReportSectionComponent: React.FC<{ section: ReportSection }> = ({ section }) => (
  <div className="flex flex-col gap-4">
    <div>
      <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
      {section.description && <p className="text-sm text-gray-500 mt-1">{section.description}</p>}
    </div>
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      <ReportTable headers={section.headers} rows={section.rows} />
    </div>
  </div>
);
