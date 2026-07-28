import { ReportData } from "../../features/reports/types";
import { ExportStrategy } from "../../features/reports/report-export";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export class PdfExporter implements ExportStrategy {
  async export(report: ReportData): Promise<void> {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(report.summary.title, 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date(report.summary.generatedAt).toLocaleString()}`, 14, 30);
    doc.text(`Total Records: ${report.summary.totalRecords}`, 14, 36);

    let currentY = 50;

    for (const section of report.sections) {
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text(section.title, 14, currentY);
      currentY += 5;

      if (section.description) {
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(section.description, 14, currentY);
        currentY += 5;
      }

      const rowsStringified = section.rows.map((row) => row.map((cell) => String(cell ?? "")));

      autoTable(doc, {
        startY: currentY,
        head: [section.headers],
        body: rowsStringified,
        margin: { top: 10, left: 14, right: 14, bottom: 10 },
      });

      currentY =
        (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;
    }

    doc.save(`report_${report.id}.pdf`);
  }
}
