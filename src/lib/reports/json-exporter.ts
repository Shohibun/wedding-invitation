import { ReportData } from "../../features/reports/types";
import { ExportStrategy } from "../../features/reports/report-export";

export class JsonExporter implements ExportStrategy {
  async export(report: ReportData): Promise<void> {
    const jsonContent = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `report_${report.id}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
