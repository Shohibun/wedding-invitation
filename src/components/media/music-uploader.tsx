import { cn } from "@/lib/utils";
import { Music, Loader2 } from "lucide-react";

interface MusicUploaderProps {
  isUploading?: boolean;
  className?: string;
  onClick?: () => void;
}

export function MusicUploader({ isUploading, className, onClick }: MusicUploaderProps) {
  return (
    <div
      onClick={!isUploading ? onClick : undefined}
      className={cn(
        "flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-colors bg-muted/20 hover:bg-muted/50 hover:border-primary/50 cursor-pointer group",
        isUploading && "pointer-events-none opacity-70",
        className
      )}
    >
      {isUploading ? (
        <>
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-3" />
          <span className="text-base font-medium">Uploading Music...</span>
          <span className="text-sm text-muted-foreground mt-1">Please wait</span>
        </>
      ) : (
        <>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
            <Music className="h-6 w-6 text-primary" />
          </div>
          <span className="text-base font-semibold">Upload Background Music</span>
          <span className="text-sm text-muted-foreground mt-1">MP3 format only (max. 20MB)</span>
        </>
      )}
    </div>
  );
}
