import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  url: string;
  className?: string;
}

export function MusicPlayer({ url, className }: MusicPlayerProps) {
  return (
    <div className={cn("w-full", className)}>
      <audio
        controls
        controlsList="nodownload noplaybackrate"
        className="w-full h-10 outline-none"
        preload="metadata"
      >
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
