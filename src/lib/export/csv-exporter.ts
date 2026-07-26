import Papa from "papaparse";
import { Guest } from "@/features/guest/types";

export function generateCsvExport(guests: Guest[]): string {
  const data = guests.map((g) => ({
    Name: g.name,
    Phone: g.phone_number || "",
    Category: g.category,
    Pax: g.pax,
    RSVP: g.rsvp_status,
    Status: g.guest_status,
    Link: `/invitation/${g.slug}?guest=${g.id}`,
    "Created At": new Date(g.created_at).toLocaleString(),
  }));

  return Papa.unparse(data);
}

export function downloadCsv(guests: Guest[], filename: string) {
  const csv = generateCsvExport(guests);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
