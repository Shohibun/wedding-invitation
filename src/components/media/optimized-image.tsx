"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string; // Force alt text for accessibility
  containerClassName?: string;
  fallbackIconClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  containerClassName,
  fallbackIconClassName,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted", containerClassName)}>
      {/* Skeleton / Pulse Overlay */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10 animate-pulse bg-muted-foreground/10" />
      )}

      {/* Fallback Icon on Error */}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <ImageIcon className={cn("h-8 w-8 text-muted-foreground/30", fallbackIconClassName)} />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          className={cn(
            "object-cover transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          {...props}
        />
      )}
    </div>
  );
}
