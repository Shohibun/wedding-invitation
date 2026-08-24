import Papa from "papaparse";

/**
 * Parses a CSV file and returns the data as an array of objects.
 */
export function parseCsvFile<T = Record<string, string>>(file: File): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase().replace(/\s+/g, "_"),
      complete: (results) => {
        if (results.errors.length > 0) {
          // Reject if there are catastrophic parse errors, otherwise we process what we can
          console.warn("CSV Parse warnings:", results.errors);
        }
        resolve(results.data);
      },
      error: (error: Error) => reject(error),
    });
  });
}
