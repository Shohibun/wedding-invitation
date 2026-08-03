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
import { Guest } from "@/features/guest/types";
import { buildGuestLink } from "@/lib/link/guest-link";
import { generateQrDataUrl, downloadQrAsPng, downloadQrAsSvg } from "@/lib/utils/qrcode";
import { Copy, Download, QrCode } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GuestLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invitationId: string;
  invitationSlug: string;
  guest: Guest | null;
  onRegenerateSuccess: () => void;
}

export function GuestLinkDialog({
  open,
  onOpenChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  invitationId,
  invitationSlug,
  guest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRegenerateSuccess,
}: GuestLinkDialogProps) {
  const [qrUrl, setQrUrl] = React.useState<string>("");
  const [domain, setDomain] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => setDomain(window.location.origin), 0);
    }
  }, []);

  const link = guest ? buildGuestLink(domain, invitationSlug, guest.id) : "";

  React.useEffect(() => {
    if (open && guest) {
      generateQrDataUrl(link)
        .then((url) => setQrUrl(url))
        .catch(() => toast.error("Failed to render QR"));
    }
  }, [open, guest, link]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const handleDownloadPng = async () => {
    if (!guest) return;
    await downloadQrAsPng(link, `qr-${guest.slug}.png`);
  };

  const handleDownloadSvg = async () => {
    if (!guest) return;
    await downloadQrAsSvg(link, `qr-${guest.slug}.svg`);
  };

  if (!guest) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Link & QR Code: {guest.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          {qrUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrUrl}
              alt={`QR Code for ${guest.name}`}
              className="w-48 h-48 border rounded-md shadow-sm"
            />
          ) : (
            <div className="w-48 h-48 border rounded-md shadow-sm flex items-center justify-center bg-muted/20">
              <QrCode className="h-10 w-10 text-muted-foreground animate-pulse" />
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownloadPng}>
              <Download className="mr-2 h-4 w-4" /> PNG
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadSvg}>
              <Download className="mr-2 h-4 w-4" /> SVG
            </Button>
          </div>

          <div className="w-full space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Guest Link</Label>
              <div className="flex gap-2">
                <Input readOnly value={link} className="text-xs bg-muted/30" />
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => copyToClipboard(link, "Guest Link")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-end sm:justify-end border-t pt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
