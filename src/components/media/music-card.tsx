import { Button } from "@/components/ui/button";
import { MusicPlayer } from "./music-player";
import { Music, RefreshCw, Trash2 } from "lucide-react";

interface MusicCardProps {
  url: string;
  filename?: string;
  sizeBytes?: number;
  onChangeClick?: () => void;
  onRemoveClick?: () => void;
}

export function MusicCard({
  url,
  filename = "background_music.mp3",
  sizeBytes,
  onChangeClick,
  onRemoveClick,
}: MusicCardProps) {
  const formatSize = (bytes?: number) => {
    if (!bytes) return "Unknown size";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="border rounded-xl p-4 bg-muted/20">
      <div className="flex items-start gap-4 mb-4">
        <div className="h-12 w-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
          <Music className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" title={filename}>
            {filename}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{formatSize(sizeBytes)}</p>
        </div>
        <div className="flex items-center gap-2">
          {onChangeClick && (
            <Button size="sm" variant="outline" onClick={onChangeClick}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Replace
            </Button>
          )}
          {onRemoveClick && (
            <Button size="sm" variant="destructive" onClick={onRemoveClick}>
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-lg bg-background p-2 border">
        <MusicPlayer url={url} />
      </div>
    </div>
  );
}
