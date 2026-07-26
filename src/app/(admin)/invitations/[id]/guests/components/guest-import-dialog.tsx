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
import { parseCsvFile } from "@/lib/import/csv-parser";
import { parseExcelFile } from "@/lib/import/excel-parser";
import { importGuestsAction } from "@/features/guest/actions";
import { UploadCloud, FileType, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GuestImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invitationId: string;
  onSuccess: () => void;
}

export function GuestImportDialog({
  open,
  onOpenChange,
  invitationId,
  onSuccess,
}: GuestImportDialogProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [summary, setSummary] = React.useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setSummary(null);
  };

  const handleImport = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      let rawObjects: unknown[] = [];
      if (file.name.endsWith(".csv")) {
        rawObjects = await parseCsvFile(file);
      } else {
        rawObjects = await parseExcelFile(file);
      }

      const res = await importGuestsAction(invitationId, rawObjects);
      if (res.success) {
        setSummary(res.data);
        toast.success("Import completed");
        onSuccess();
      } else {
        toast.error(res.error || "Failed to import guests");
      }
    } catch {
      toast.error("An error occurred during import");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setSummary(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={open ? onOpenChange : reset}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Import Guests</DialogTitle>
        </DialogHeader>

        {!summary ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center flex flex-col items-center justify-center bg-muted/20">
              <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
              {file ? (
                <div className="flex items-center gap-2">
                  <FileType className="h-5 w-5 text-primary" />
                  <span className="font-medium">{file.name}</span>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium mb-1">Drag & drop or click to upload</p>
                  <p className="text-xs text-muted-foreground mb-4">Supports .csv, .xlsx</p>
                  <Button
                    variant="secondary"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    Select File
                  </Button>
                </>
              )}
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileChange}
              />
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={reset} disabled={isProcessing}>
                Cancel
              </Button>
              <Button onClick={handleImport} disabled={!file || isProcessing}>
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm Import
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center bg-muted/10">
                <p className="text-2xl font-bold">{summary.summary.total}</p>
                <p className="text-xs text-muted-foreground">Total Rows</p>
              </div>
              <div className="p-4 border rounded-lg text-center bg-success/10 border-success/20">
                <p className="text-2xl font-bold text-success">{summary.summary.validCount}</p>
                <p className="text-xs text-success">Imported</p>
              </div>
              <div className="p-4 border rounded-lg text-center bg-destructive/10 border-destructive/20">
                <p className="text-2xl font-bold text-destructive">
                  {summary.summary.invalidCount}
                </p>
                <p className="text-xs text-destructive">Skipped</p>
              </div>
            </div>

            {summary.invalid.length > 0 && (
              <div className="border rounded-md mt-4">
                <div className="bg-muted px-4 py-2 font-medium text-sm flex items-center border-b">
                  <AlertCircle className="h-4 w-4 mr-2 text-warning" />
                  Skipped Rows
                </div>
                <ScrollArea className="h-[200px]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left font-medium">Row</th>
                        <th className="p-2 text-left font-medium">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summary.invalid.map((inv: { row: number; reason: string }, i: number) => (
                        <tr key={i} className="border-b">
                          <td className="p-2 w-16">{inv.row}</td>
                          <td className="p-2 text-destructive">{inv.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ScrollArea>
              </div>
            )}
            <DialogFooter className="mt-4">
              <Button onClick={reset}>Close</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
