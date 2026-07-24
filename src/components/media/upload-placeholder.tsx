import { cn } from "@/lib/utils";
import { ImagePlus, Loader2 } from "lucide-react";

interface UploadPlaceholderProps {
  label?: string;
  isUploading?: boolean;
  className?: string;
  onClick?: () => void;
}

export function UploadPlaceholder({
  label = "Upload Image",
  isUploading,
  className,
  onClick,
}: UploadPlaceholderProps) {
  return (
    <div
      onClick={!isUploading ? onClick : undefined}
      className={cn(
        "flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-colors bg-muted/20 hover:bg-muted/50 hover:border-primary/50 cursor-pointer group",
        isUploading && "pointer-events-none opacity-70",
        className
      )}
    >
      {isUploading ? (
        <>
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
          <span className="text-sm font-medium">Uploading...</span>
        </>
      ) : (
        <>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
            <ImagePlus className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </>
      )}
    </div>
  );
}
