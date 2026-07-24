import { Button } from "@/components/ui/button";
import { RefreshCw, Trash2 } from "lucide-react";
import { OptimizedImage } from "./optimized-image";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  url: string;
  alt?: string;
  className?: string;
  onChangeClick?: () => void;
  onRemoveClick?: () => void;
}

export function ImagePreview({
  url,
  alt = "Preview",
  className,
  onChangeClick,
  onRemoveClick,
}: ImagePreviewProps) {
  return (
    <div className={cn("relative group rounded-xl overflow-hidden border bg-muted", className)}>
      <OptimizedImage
        src={url}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        containerClassName="absolute inset-0"
      />

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
        {onChangeClick && (
          <Button size="sm" variant="secondary" onClick={onChangeClick} className="h-8">
            <RefreshCw className="h-4 w-4 mr-2" />
            Change
          </Button>
        )}
        {onRemoveClick && (
          <Button size="sm" variant="destructive" onClick={onRemoveClick} className="h-8">
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
