import { ReportData } from "../../features/reports/types";
import { ExportStrategy } from "../../features/reports/report-export";

export class CsvExporter implements ExportStrategy {
  async export(report: ReportData): Promise<void> {
    const csvParts: string[] = [];
    csvParts.push(`Report Title,${report.summary.title}`);
    csvParts.push(`Generated At,${report.summary.generatedAt}`);
    csvParts.push(`Total Records,${report.summary.totalRecords}`);
    csvParts.push(""); // empty line

    for (const section of report.sections) {
      csvParts.push(`--- ${section.title} ---`);
      csvParts.push(section.headers.join(","));
      for (const row of section.rows) {
        csvParts.push(row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","));
      }
      csvParts.push("");
    }

    const csvContent = csvParts.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `report_${report.id}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
