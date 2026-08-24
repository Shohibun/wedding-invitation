import * as React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/utils";

export interface ImageProps extends NextImageProps {
  containerClassName?: string;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, containerClassName, alt, ...props }, ref) => {
    return (
      <div className={cn("relative overflow-hidden bg-muted", containerClassName)}>
        <NextImage
          ref={ref}
          alt={alt || "Image"}
          className={cn("object-cover transition-opacity duration-500", className)}
          {...props}
        />
      </div>
    );
  }
);
Image.displayName = "Image";
