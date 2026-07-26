import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Guest } from "@/features/guest/types";

export function downloadPdf(guests: Guest[], filename: string, title: string = "Guest List") {
  const doc = new jsPDF("landscape");

  // Title
  doc.setFontSize(18);
  doc.text(title, 14, 22);

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(
    `Total Guests: ${guests.length} | Generated on: ${new Date().toLocaleDateString()}`,
    14,
    30
  );

  const tableColumn = ["Name", "Phone", "Category", "Pax", "RSVP", "Status"];
  const tableRows = guests.map((g) => [
    g.name,
    g.phone_number || "-",
    g.category.toUpperCase(),
    g.pax.toString(),
    g.rsvp_status.toUpperCase(),
    g.guest_status.toUpperCase(),
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 35,
    theme: "striped",
    headStyles: { fillColor: [41, 128, 185] },
  });

  doc.save(filename);
}
