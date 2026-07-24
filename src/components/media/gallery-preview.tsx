"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface GalleryPreviewProps {
  url: string | null;
  onClose: () => void;
}

export function GalleryPreview({ url, onClose }: GalleryPreviewProps) {
  return (
    <Dialog open={!!url} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95 border-0">
        <VisuallyHidden>
          <DialogTitle>Image Preview</DialogTitle>
          <DialogDescription>A full screen preview of the selected image</DialogDescription>
        </VisuallyHidden>
        <div className="relative w-full h-[80vh] flex items-center justify-center">
          {url && <Image src={url} alt="Preview" fill className="object-contain" sizes="100vw" />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
