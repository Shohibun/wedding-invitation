"use client";

import React, { useState, useRef, useSyncExternalStore } from "react";
import { useMediaUpload } from "@/features/media/hooks/useMediaUpload";
import { MediaDropzone } from "./MediaDropzone";
import { StorageBucket } from "@/lib/storage";
import { Loader2, Music, Play, Pause, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AudioUploaderProps {
  invitationId: string;
  bucket: StorageBucket;
  currentUrl?: string;
  onSuccess: (url: string) => void;
  onDelete?: () => void;
  className?: string;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function AudioUploader({
  invitationId,
  bucket,
  currentUrl,
  onSuccess,
  onDelete,
  className,
}: AudioUploaderProps) {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { uploadFile, isUploading, progress } = useMediaUpload({
    invitationId,
    bucket,
    mediaType: "audio",
    replace: !!currentUrl,
    onSuccess,
  });

  const handleUpload = async (file: File) => {
    try {
      await uploadFile(file);
    } catch {
      // Error handled in hook
    }
  };

  const handleTogglePlay = () => {
    if (!audioRef.current || !currentUrl) return;
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio.volume = 1.0;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio test playback failed:", err);
          setIsPlaying(false);
        });
    }
  };

  const handleDelete = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    if (onDelete) {
      onDelete();
    }
  };

  if (!isMounted) {
    return (
      <div
        className={`border rounded-md p-4 bg-surfaceMuted flex items-center justify-center ${className || ""}`}
      >
        <Loader2 className="w-5 h-5 animate-spin text-textMuted" />
      </div>
    );
  }

  if (currentUrl) {
    return (
      <div
        className={`border rounded-md p-4 bg-surfaceMuted space-y-3 ${className || ""}`}
        suppressHydrationWarning
      >
        <audio
          ref={audioRef}
          src={currentUrl}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          preload="auto"
          playsInline
        />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <Button
              type="button"
              variant={isPlaying ? "default" : "outline"}
              size="icon"
              className={`h-9 w-9 rounded-full shrink-0 transition-all ${
                isPlaying
                  ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20"
                  : ""
              }`}
              onClick={handleTogglePlay}
              title={isPlaying ? "Jeda tes lagu" : "Putar tes lagu"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5 text-primary" />
              )}
            </Button>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold truncate flex items-center gap-1.5">
                <Music
                  className={`w-3.5 h-3.5 ${isPlaying ? "text-amber-500 animate-bounce" : "text-primary/70"} shrink-0`}
                />
                Background Music MP3
              </span>
              <span className="text-[10px] text-textMuted truncate">
                {isPlaying ? "Sedang memutar tes audio..." : "Audio terpasang & siap diputar"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <MediaDropzone
              onFileSelect={handleUpload}
              accept="audio/mpeg, audio/mp3, audio/wav, audio/m4a"
              className="border-none p-0 bg-transparent hover:bg-transparent min-h-0 h-auto"
              disabled={isUploading}
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 text-xs px-2"
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Ganti"}
              </Button>
            </MediaDropzone>

            {onDelete && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {isUploading && (
          <div className="w-full">
            <Progress value={progress} className="h-1.5 rounded-full" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className} suppressHydrationWarning>
      <MediaDropzone
        onFileSelect={handleUpload}
        accept="audio/mpeg, audio/mp3, audio/wav, audio/m4a"
        disabled={isUploading}
      >
        <div className="flex flex-col items-center justify-center p-6 text-center text-textMuted">
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 mb-2 animate-spin text-primary" />
              <p className="text-sm font-medium text-text">Mengunggah Musik... {progress}%</p>
              <Progress value={progress} className="w-32 mt-2" />
            </>
          ) : (
            <>
              <Music className="w-8 h-8 mb-2 text-primary/80" />
              <p className="text-sm font-medium text-text">Klik atau drag file musik .MP3</p>
              <p className="text-xs mt-1">Format MP3, WAV, M4A (Maksimal 10MB)</p>
            </>
          )}
        </div>
      </MediaDropzone>
    </div>
  );
}
