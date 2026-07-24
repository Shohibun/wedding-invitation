import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { UploadPlaceholder } from "./upload-placeholder";
import { toast } from "sonner";
import { StorageBucket } from "@/lib/storage";
import { AssetMediaType, MediaAsset } from "@/features/media/types";
import { replaceSingleMediaAction } from "@/features/media/actions";

interface MediaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invitationId: string;
  bucket: StorageBucket;
  mediaType: AssetMediaType;
  onUploadSuccess: (asset: MediaAsset) => void;
}

export function MediaDialog({
  open,
  onOpenChange,
  invitationId,
  bucket,
  mediaType,
  onUploadSuccess,
}: MediaDialogProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);
    formData.append("mediaType", mediaType);
    formData.append("invitationId", invitationId);

    const result = await replaceSingleMediaAction(formData);

    setIsUploading(false);

    if (result.error) {
      toast.error(`Failed to upload: ${result.error}`);
    } else if (result.data) {
      toast.success("Image updated successfully");
      onUploadSuccess(result.data as MediaAsset);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Media</DialogTitle>
          <DialogDescription>
            Upload a new {mediaType} image. This will immediately replace the existing one.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <input
            id="single-media-upload"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <UploadPlaceholder
            label={`Select new ${mediaType} image...`}
            isUploading={isUploading}
            onClick={() => document.getElementById("single-media-upload")?.click()}
            className="aspect-video"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
