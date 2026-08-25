"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CoverSectionProps } from "./types";
import { useTemplateData, useTemplate } from "@/templates/core/hooks";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils/format-date";
import { MailOpen, RotateCcw, VolumeX, Volume2 } from "lucide-react";

export function CoverSection({ className }: CoverSectionProps) {
  const templateContext = useTemplate();
  const setIsCoverOpen = templateContext?.setIsCoverOpen;

  const data = useTemplateData<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >();

  const couple = data?.couple;
  const events = data?.events;
  const firstEventDate = events?.[0]?.date;
  const guestName = data?.guest?.name || "Tamu Undangan";

  const coverImage =
    data?.cover?.image ||
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2070&auto=format&fit=crop";
  const coverTitle = data?.cover?.title || "The Wedding Of";
  const coverGreeting = data?.cover?.greeting || "Kepada Yth. Bapak/Ibu/Saudara/i:";
  const buttonText = data?.cover?.buttonText || "Buka Undangan";
  const musicUrl =
    data?.cover?.musicUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  const [isOpen, setIsOpen] = React.useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Sync local isOpen state with template-wide LayoutEngine
  React.useEffect(() => {
    if (setIsCoverOpen) {
      setIsCoverOpen(isOpen);
    }
  }, [isOpen, setIsCoverOpen]);

  // Lock scroll on parent containers when cover is closed
  React.useEffect(() => {
    const lockScroll = () => {
      const scrollContainers = document.querySelectorAll(
        ".builder-preview-container, .preview-frame-scroll, body"
      );
      scrollContainers.forEach((el) => {
        if (!isOpen) {
          (el as HTMLElement).style.overflow = "hidden";
          (el as HTMLElement).scrollTop = 0;
        } else {
          (el as HTMLElement).style.overflow = "";
        }
      });
    };

    lockScroll();

    return () => {
      const scrollContainers = document.querySelectorAll(
        ".builder-preview-container, .preview-frame-scroll, body"
      );
      scrollContainers.forEach((el) => {
        (el as HTMLElement).style.overflow = "";
      });
    };
  }, [isOpen]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current && musicUrl) {
      try {
        const audio = audioRef.current;
        audio.muted = false;
        audio.volume = 1.0;
        audio.currentTime = 0;

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlayingMusic(true))
            .catch((err) => {
              console.warn("Audio autoplay blocked by browser or delayed:", err);
              // Fallback retry after slight DOM stabilization
              setTimeout(() => {
                if (audioRef.current) {
                  audioRef.current
                    .play()
                    .then(() => setIsPlayingMusic(true))
                    .catch(() => {});
                }
              }, 150);
            });
        }
      } catch (err) {
        console.warn("Audio play error:", err);
      }
    }
  };

  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.muted = false;
      audioRef.current.volume = 1.0;
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => setIsPlayingMusic(false));
    }
  };

  return (
    <>
      {/* Background Native MP3 Audio Player */}
      {musicUrl && (
        <audio
          ref={audioRef}
          preload="auto"
          loop
          playsInline
          src={musicUrl}
          onPlay={() => setIsPlayingMusic(true)}
          onPause={() => setIsPlayingMusic(false)}
        />
      )}

      {/* Opening Dual-Split Curtain Overlay - Positioned Absolute to fit seamlessly inside Mobile Frame */}
      <AnimatePresence>
        {!isOpen && (
          <div
            key="cover-wrapper"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className={`absolute inset-0 z-50 overflow-hidden select-none pointer-events-auto h-full w-full bg-black ${className || ""}`}
          >
            {/* Left Curtain Panel */}
            <motion.div
              key="curtain-left"
              initial={{ x: 0 }}
              exit={{
                x: "-100%",
                transition: { duration: 1.1, ease: [0.32, 0.72, 0, 1] },
              }}
              className="absolute left-0 top-0 bottom-0 w-1/2 overflow-hidden z-20 border-r border-white/10"
            >
              <div className="absolute inset-0 w-[200%] h-full left-0">
                <Image
                  src={coverImage}
                  alt="Wedding Cover Left"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={coverImage.startsWith("data:")}
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </motion.div>

            {/* Right Curtain Panel */}
            <motion.div
              key="curtain-right"
              initial={{ x: 0 }}
              exit={{
                x: "100%",
                transition: { duration: 1.1, ease: [0.32, 0.72, 0, 1] },
              }}
              className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden z-20 border-l border-white/10"
            >
              <div className="absolute inset-0 w-[200%] h-full -left-full">
                <Image
                  src={coverImage}
                  alt="Wedding Cover Right"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={coverImage.startsWith("data:")}
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </motion.div>

            {/* Center Content Overlay */}
            <motion.div
              key="curtain-content"
              initial={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 1.06,
                transition: { duration: 0.5, ease: "easeOut" },
              }}
              className="absolute inset-0 z-30 flex flex-col justify-between items-center text-center px-4 pt-10 pb-8 sm:pb-12 h-full w-full pointer-events-none"
              style={{
                paddingBottom: "max(2.5rem, calc(1.5rem + env(safe-area-inset-bottom, 0px)))",
              }}
            >
              {/* Top Header Block (Positioned below the notch) */}
              <div className="pt-2 sm:pt-4 flex flex-col items-center gap-1.5 px-3 max-w-xs mx-auto pointer-events-auto">
                <Text
                  size="sm"
                  className="uppercase tracking-[0.25em] text-amber-300/90 text-[10px] sm:text-xs font-medium"
                >
                  {coverTitle}
                </Text>
                <Heading
                  level={1}
                  className="text-white text-2xl sm:text-3xl md:text-4xl font-serif font-light tracking-wide mt-0.5 leading-tight"
                >
                  {couple?.groom?.nickname || "Groom"} & {couple?.bride?.nickname || "Bride"}
                </Heading>
                {firstEventDate && (
                  <Text className="text-[11px] sm:text-xs font-light tracking-widest text-white/80 mt-0.5">
                    {formatDate(firstEventDate)}
                  </Text>
                )}
              </div>

              {/* Bottom Glassmorphic Frosted Guest Card */}
              <div className="w-full max-w-xs sm:max-w-sm mb-4 sm:mb-6 bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col items-center gap-3 pointer-events-auto">
                <div className="flex flex-col items-center gap-1">
                  <Text size="sm" className="text-white/80 text-[11px] sm:text-xs font-light">
                    {coverGreeting}
                  </Text>
                  <Heading
                    level={4}
                    className="font-semibold text-white text-sm sm:text-base md:text-lg tracking-wide"
                  >
                    {guestName}
                  </Heading>
                  <Text
                    size="sm"
                    className="text-white/60 text-[10px] sm:text-[11px] italic leading-tight text-center mt-0.5"
                  >
                    Mohon maaf apabila ada kesalahan penulisan nama atau gelar.
                  </Text>
                </div>

                <Button
                  size="default"
                  className="w-full sm:w-auto rounded-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs sm:text-sm font-medium shadow-xl gap-2 px-6 py-2.5 transition-transform active:scale-95 border border-white/20 mt-1 cursor-pointer"
                  onClick={handleOpenInvitation}
                >
                  <MailOpen className="w-4 h-4 animate-bounce" />
                  <span>{buttonText}</span>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Music Control Button inside frame when invitation is open */}
      {isOpen && musicUrl && (
        <button
          onClick={handleToggleMusic}
          className="fixed sm:absolute bottom-6 sm:bottom-4 left-4 z-40 bg-black/75 hover:bg-black/90 text-white text-xs p-3 rounded-full backdrop-blur-md border border-white/25 flex items-center justify-center shadow-2xl transition-all active:scale-95"
          title={isPlayingMusic ? "Jeda Musik Latar" : "Putar Musik Latar"}
        >
          {isPlayingMusic ? (
            <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-white/60" />
          )}
        </button>
      )}

      {/* Floating Re-open Cover Control inside frame */}
      {isOpen && (
        <button
          onClick={() => {
            setIsOpen(false);
            if (audioRef.current) {
              audioRef.current.pause();
              setIsPlayingMusic(false);
            }
          }}
          className="fixed sm:absolute bottom-6 sm:bottom-4 right-4 z-40 bg-black/70 hover:bg-black/85 text-white text-xs px-3.5 py-2 rounded-full backdrop-blur-md border border-white/25 flex items-center gap-1.5 shadow-2xl transition-all active:scale-95"
          title="Tutup kembali sampul"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sampul</span>
        </button>
      )}
    </>
  );
}
