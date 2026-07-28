import { ReportData } from "../../features/reports/types";
import { ExportStrategy } from "../../features/reports/report-export";
import * as XLSX from "xlsx";

export class ExcelExporter implements ExportStrategy {
  async export(report: ReportData): Promise<void> {
    const wb = XLSX.utils.book_new();

    // Summary Sheet
    const summaryData = [
      ["Report Title", report.summary.title],
      ["Generated At", report.summary.generatedAt],
      ["Total Records", report.summary.totalRecords],
    ];
    const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");

    // Sections Sheets
    for (const section of report.sections) {
      // Ensure the sheet name is <= 31 chars and valid for Excel
      const safeTitle = section.title.replace(/[\\/?*\[\]]/g, "").substring(0, 31);

      const sheetData = [section.headers, ...section.rows];
      const ws = XLSX.utils.aoa_to_sheet(sheetData);

      // If a title is duplicated, this could throw, but in our design sections are usually unique
      try {
        XLSX.utils.book_append_sheet(wb, ws, safeTitle);
      } catch (_e) {
        XLSX.utils.book_append_sheet(wb, ws, `${safeTitle}_${Math.floor(Math.random() * 1000)}`);
      }
    }

    XLSX.writeFile(wb, `report_${report.id}.xlsx`);
  }
}
