"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getAssetsAction } from "../actions";
import { useMediaDelete } from "../hooks/useMediaDelete";
import Image from "next/image";
import { Loader2, Trash2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface MediaLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invitationId: string;
  mediaType?: "image" | "audio" | "video" | "qr";
  onSelect: (url: string) => void;
}

export function MediaLibraryDialog({
  open,
  onOpenChange,
  invitationId,
  mediaType,
  onSelect,
}: MediaLibraryDialogProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [assets, setAssets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteFile, isDeleting } = useMediaDelete();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      setIsLoading(true);
      try {
        const result = await getAssetsAction(invitationId, mediaType);
        if (result.data) {
          setAssets(result.data);
        }
      } catch (error) {
        toast.error("Failed to load media library");
      } finally {
        setIsLoading(false);
      }
    };

    if (open) {
      loadAssets();
    }
  }, [open, invitationId, mediaType]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteFile(id);
      setAssets(assets.filter((a) => a.id !== id));
      if (selectedId === id) setSelectedId(null);
    } catch (e) {
      // Error handled in hook
    }
  };

  const handleConfirm = () => {
    const asset = assets.find((a) => a.id === selectedId);
    if (asset) {
      onSelect(asset.url);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
          <DialogDescription>
            Select a previously uploaded file or delete unused ones.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-[300px] p-1">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : assets.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-textMuted">
              <p>No media files found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {assets.map((asset) => {
                const isSelected = selectedId === asset.id;

                return (
                  <div
                    key={asset.id}
                    className={`relative group rounded-md overflow-hidden aspect-square border-2 cursor-pointer transition-all ${isSelected ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-border"}`}
                    onClick={() => setSelectedId(asset.id)}
                  >
                    {asset.media_type === "image" || asset.media_type === "qr" ? (
                      <Image src={asset.url} alt={asset.file_name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-surfaceMuted flex items-center justify-center text-xs p-2 text-center break-words">
                        {asset.file_name}
                      </div>
                    )}

                    {isSelected && (
                      <div className="absolute top-2 left-2 bg-primary text-white rounded-full p-0.5 z-20">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}

                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 w-7 h-7 opacity-0 group-hover:opacity-100 z-20"
                      onClick={(e) => handleDelete(asset.id, e)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="default" disabled={!selectedId} onClick={handleConfirm}>
            Use Selected
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
