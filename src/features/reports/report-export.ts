import { ReportData, ReportFormat } from "./types";
import { CsvExporter } from "../../lib/reports/csv-exporter";
import { JsonExporter } from "../../lib/reports/json-exporter";
import { PdfExporter } from "../../lib/reports/pdf-exporter";
import { ExcelExporter } from "../../lib/reports/excel-exporter";
import { ReportExportError } from "./errors";

export interface ExportStrategy {
  export(report: ReportData): Promise<void>;
}

export const ExportEngine = {
  async export(report: ReportData, format: ReportFormat): Promise<void> {
    try {
      let strategy: ExportStrategy;
      switch (format) {
        case "csv":
          strategy = new CsvExporter();
          break;
        case "json":
          strategy = new JsonExporter();
          break;
        case "pdf":
          strategy = new PdfExporter();
          break;
        case "excel":
          strategy = new ExcelExporter();
          break;
        default:
          throw new Error("Unsupported format");
      }

      await strategy.export(report);
    } catch (err) {
      throw new ReportExportError(`Failed to export report to ${format}`, err);
    }
  },
};
