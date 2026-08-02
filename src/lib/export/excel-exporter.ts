import * as XLSX from "xlsx";
import { Guest } from "@/features/guest/types";

export function generateExcelExport(guests: Guest[]) {
  const data = guests.map((g) => ({
    Name: g.name,
    Phone: g.phone_number || "",
    "Max Pax": g.max_pax,
    Link: `/invitation/${g.slug}?guest=${g.id}`,
    "Created At": new Date(g.created_at).toLocaleString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Guests");
  return workbook;
}

export function downloadExcel(guests: Guest[], filename: string) {
  const workbook = generateExcelExport(guests);
  XLSX.writeFile(workbook, filename);
}
