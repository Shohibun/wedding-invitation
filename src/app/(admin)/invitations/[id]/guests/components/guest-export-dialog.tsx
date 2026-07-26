"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import { Field, FieldLabel } from "@/components/ui/field";
import { Guest } from "@/features/guest/types";
import { getAllGuestsAction } from "@/features/guest/actions";
import { downloadCsv } from "@/lib/export/csv-exporter";
import { downloadExcel } from "@/lib/export/excel-exporter";
import { downloadPdf } from "@/lib/export/pdf-exporter";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface GuestExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invitationId: string;
  invitationSlug: string;
  selectedGuests: Guest[];
}

export function GuestExportDialog({
  open,
  onOpenChange,
  invitationId,
  invitationSlug,
  selectedGuests,
}: GuestExportDialogProps) {
  const [format, setFormat] = React.useState<"csv" | "excel" | "pdf">("excel");
  const [scope, setScope] = React.useState<"all" | "selected" | "attending">("all");
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      let guestsToExport: Guest[] = [];

      if (scope === "selected") {
        if (selectedGuests.length === 0) {
          toast.error("No guests selected for export.");
          setIsExporting(false);
          return;
        }
        guestsToExport = selectedGuests;
      } else {
        // Fetch all guests
        const res = await getAllGuestsAction(invitationId);
        if (!res.success || !res.data) {
          throw new Error(res.error || "Failed to fetch guests");
        }

        guestsToExport = res.data;

        if (scope === "attending") {
          guestsToExport = guestsToExport.filter((g) => g.rsvp_status === "accepted");
        }
      }

      const filename = `guests_${invitationSlug}_${new Date().toISOString().split("T")[0]}`;

      if (format === "csv") {
        downloadCsv(guestsToExport, `${filename}.csv`);
      } else if (format === "excel") {
        downloadExcel(guestsToExport, `${filename}.xlsx`);
      } else if (format === "pdf") {
        downloadPdf(guestsToExport, `${filename}.pdf`, `Guest List: /${invitationSlug}`);
      }

      toast.success("Export successful");
      onOpenChange(false);
    } catch {
      toast.error("An error occurred during export");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Guests</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Field>
            <FieldLabel>Export Scope</FieldLabel>
            <NativeSelect
              value={scope}
              onChange={(e) => setScope(e.target.value as "all" | "selected" | "attending")}
            >
              <option value="all">All Guests</option>
              {selectedGuests.length > 0 && (
                <option value="selected">Selected Guests ({selectedGuests.length})</option>
              )}
              <option value="attending">Attending Only</option>
            </NativeSelect>
          </Field>

          <Field>
            <FieldLabel>Format</FieldLabel>
            <NativeSelect
              value={format}
              onChange={(e) => setFormat(e.target.value as "excel" | "csv" | "pdf")}
            >
              <option value="excel">Excel (.xlsx)</option>
              <option value="csv">CSV (.csv)</option>
              <option value="pdf">PDF (.pdf)</option>
            </NativeSelect>
          </Field>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isExporting}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
