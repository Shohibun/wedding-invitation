import * as XLSX from "xlsx";

/**
 * Parses an Excel (.xlsx or .xls) file and returns the first sheet's data as an array of objects.
 */
export async function parseExcelFile(file: File): Promise<Record<string, unknown>[]> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  if (workbook.SheetNames.length === 0) {
    throw new Error("Excel file is empty");
  }

  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  // Convert to JSON
  const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    raw: false,
    defval: "",
  });

  // Normalize keys like CSV
  const normalizedData = data.map((row: Record<string, unknown>) => {
    const newRow: Record<string, unknown> = {};
    for (const key in row) {
      const newKey = key.trim().toLowerCase().replace(/\s+/g, "_");
      newRow[newKey] = typeof row[key] === "string" ? row[key].trim() : row[key];
    }
    return newRow;
  });

  return normalizedData;
}
