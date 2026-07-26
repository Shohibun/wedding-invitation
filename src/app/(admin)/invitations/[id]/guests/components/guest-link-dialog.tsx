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
import { regenerateGuestTokenAction } from "@/features/guest/actions";
import { buildFullGuestLink, buildShortGuestLink } from "@/lib/link/guest-link";
import { generateQrDataUrl, downloadQrAsPng, downloadQrAsSvg } from "@/lib/utils/qrcode";
import { Copy, Download, RefreshCw, Loader2, Link as LinkIcon, QrCode } from "lucide-react";
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
  invitationId,
  invitationSlug,
  guest,
  onRegenerateSuccess,
}: GuestLinkDialogProps) {
  const [qrUrl, setQrUrl] = React.useState<string>("");
  const [isRegenerating, setIsRegenerating] = React.useState(false);
  const [domain, setDomain] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => setDomain(window.location.origin), 0);
    }
  }, []);

  const shortLink = guest ? buildShortGuestLink(domain, guest.slug, guest.access_token) : "";
  const fullLink = guest
    ? buildFullGuestLink(domain, invitationSlug, guest.id) + `&token=${guest.access_token}`
    : "";

  React.useEffect(() => {
    if (open && guest) {
      generateQrDataUrl(shortLink)
        .then((url) => setQrUrl(url))
        .catch(() => toast.error("Failed to render QR"));
    }
  }, [open, guest, shortLink]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const handleDownloadPng = async () => {
    if (!guest) return;
    await downloadQrAsPng(shortLink, `qr-${guest.slug}.png`);
  };

  const handleDownloadSvg = async () => {
    if (!guest) return;
    await downloadQrAsSvg(shortLink, `qr-${guest.slug}.svg`);
  };

  const handleRegenerate = async () => {
    if (!guest) return;
    const confirmMsg =
      "Are you sure? This will invalidate any previously shared links and QR codes for this guest.";
    if (!confirm(confirmMsg)) return;

    setIsRegenerating(true);
    try {
      const res = await regenerateGuestTokenAction(guest.id, invitationId);
      if (res.success) {
        toast.success("Guest link regenerated successfully.");
        onRegenerateSuccess(); // Will trigger refresh to update the guest data
      } else {
        toast.error(res.error || "Failed to regenerate token.");
      }
    } catch {
      toast.error("An error occurred while regenerating token.");
    } finally {
      setIsRegenerating(false);
    }
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
              <Label className="text-xs font-medium text-muted-foreground">
                Short Link (Recommended)
              </Label>
              <div className="flex gap-2">
                <Input readOnly value={shortLink} className="text-xs bg-muted/30" />
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => copyToClipboard(shortLink, "Short Link")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Direct Full Link</Label>
              <div className="flex gap-2">
                <Input readOnly value={fullLink} className="text-xs bg-muted/30" />
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => copyToClipboard(fullLink, "Full Link")}
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between border-t pt-4">
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleRegenerate}
            disabled={isRegenerating}
          >
            {isRegenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Regenerate Link
          </Button>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
