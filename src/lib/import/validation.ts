import { z } from "zod";
import { importGuestSchema } from "@/features/guest/schema";
import { GuestImport } from "@/features/guest/schema";
import { Guest } from "@/features/guest/types";

export interface ImportValidationResult {
  valid: GuestImport[];
  invalid: { row: number; reason: string; data: unknown }[];
  summary: {
    total: number;
    validCount: number;
    invalidCount: number;
  };
}

/**
 * Validates raw objects against Zod schema and checks for duplicates.
 * Implements "Skip Existing" strategy for conflicts.
 */
export function validateGuestImport(
  rawObjects: unknown[],
  existingGuests: Guest[]
): ImportValidationResult {
  const valid: GuestImport[] = [];
  const invalid: { row: number; reason: string; data: unknown }[] = [];

  // Create fast lookup maps for duplicate detection
  // Priority 1: Phone
  const phoneMap = new Set(
    existingGuests.filter((g) => g.phone_number).map((g) => g.phone_number!)
  );
  // Priority 2: Name (case-insensitive for safety)
  const nameMap = new Set(existingGuests.map((g) => g.name.toLowerCase()));

  // Local maps to catch duplicates within the import file itself
  const localPhoneMap = new Set<string>();
  const localNameMap = new Set<string>();

  rawObjects.forEach((rawRow, index) => {
    const row = rawRow as Record<string, string | undefined>;
    const rowNumber = index + 2; // +1 for 0-index, +1 for header row

    // 1. Zod structural validation
    const parsed = importGuestSchema.safeParse({
      name: row.name,
      phone_number: row.phone || row.phone_number,
      max_pax: row.pax ? parseInt(row.pax, 10) : undefined,
    });

    if (!parsed.success) {
      invalid.push({
        row: rowNumber,
        reason: parsed.error.issues.map((e: z.ZodIssue) => e.message).join(", "),
        data: row,
      });
      return;
    }

    const guestData = parsed.data;

    // 2. Business validation: Duplicate Detection (Skip Existing)

    // Check phone first
    if (guestData.phone_number) {
      if (phoneMap.has(guestData.phone_number) || localPhoneMap.has(guestData.phone_number)) {
        invalid.push({
          row: rowNumber,
          reason: "Duplicate phone number (Already exists or duplicate in file)",
          data: row,
        });
        return;
      }
    }

    // Check name
    const lowerName = guestData.name.toLowerCase();
    if (nameMap.has(lowerName) || localNameMap.has(lowerName)) {
      invalid.push({
        row: rowNumber,
        reason: "Duplicate name (Already exists or duplicate in file)",
        data: row,
      });
      return;
    }

    // 3. Mark as valid and update local maps
    if (guestData.phone_number) localPhoneMap.add(guestData.phone_number);
    localNameMap.add(lowerName);
    valid.push(guestData);
  });

  return {
    valid,
    invalid,
    summary: {
      total: rawObjects.length,
      validCount: valid.length,
      invalidCount: invalid.length,
    },
  };
}
